import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import Promise from 'bluebird'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, loadAbiByName, getContract, blockchain, coinbase, listenAddress } from '../../utils/web3'
import { promiseFor } from '../../utils/helper'
import { flashMessage } from '../app/actions'

export function loadModule(marketAddress) {
  return (dispatch) => {
    let market
    let tokenAbi
    let lotAbi
    getContractByAbiName('Market', marketAddress)
      .then((contract) => {
        market = contract
        return loadAbiByName('TokenEmission')
      })
      .then((abi) => {
        tokenAbi = abi
        return loadAbiByName('Lot')
      })
      .then((abi) => {
        lotAbi = abi
      })
      .then(() => {
        const lots = [];
        market.call('first')
          .then(firstAddress => (
            promiseFor(address => address !== '0x0000000000000000000000000000000000000000', (address) => {
              const lot = getContract(lotAbi, address)
              let item = {}
              let tokenSale
              let tokenBuy

              return lot.call('closed')
                .then((closed) => {
                  if (!closed) {
                    // если лот открыт, то получаем данные по лоту
                    return Promise.join(
                      lot.call('seller'),
                      lot.call('buyer'),
                      lot.call('quantity_sale'),
                      lot.call('quantity_buy'),
                      lot.call('sale'),
                      lot.call('buy'),
                      (seller, buyer, quantitySale, quantityBuy, sale, buy) => (
                        {
                          my: (seller === coinbase()),
                          seller,
                          buyer,
                          sale_quantity: _.toNumber(quantitySale),
                          buy_quantity: _.toNumber(quantityBuy),
                          sale_address: sale,
                          buy_address: buy
                        }
                      )
                    );
                  }
                  return false;
                })
                .then((lotResult) => {
                  if (lotResult) {
                    // если данные по лоту получены, то получаем данные по токенам лота
                    item = { ...lotResult, closed, address }
                    tokenSale = getContract(tokenAbi, item.sale_address)
                    tokenBuy = getContract(tokenAbi, item.buy_address)
                    return Promise.join(
                      tokenSale.call('name'),
                      tokenSale.call('allowance', [item.seller, address]),
                      tokenSale.call('balanceOf', [item.seller]),
                      tokenBuy.call('name'),
                      tokenBuy.call('allowance', [coinbase(), address]),
                      tokenBuy.call('balanceOf', [coinbase()]),
                      (saleName, saleApprove, saleBalance, buyName, buyApprove, buyBalance) => {
                        const saleApproveNum = _.toNumber(saleApprove)
                        const saleBalanceNum = _.toNumber(saleBalance)
                        const buyApproveNum = _.toNumber(buyApprove)
                        const buyBalanceNum = _.toNumber(buyBalance)
                        return {
                          sale_name: saleName,
                          approve_sale_quantity: saleApproveNum > saleBalanceNum ?
                            saleBalanceNum : saleApproveNum,
                          buy_name: buyName,
                          approve_buy_quantity: buyApproveNum > buyBalanceNum ?
                            buyBalanceNum : buyApproveNum
                        }
                      }
                    );
                  }
                  return false;
                })
                .then((tokensInfoResult) => {
                  if (tokensInfoResult) {
                    lots.push({ ...item, ...tokensInfoResult })
                    listenAddress(item.address, 'loadModuleMarket', () => {
                      dispatch(loadModule(marketAddress))
                    })
                    listenAddress(item.sale_address, 'loadModuleMarket', () => {
                      dispatch(loadModule(marketAddress))
                    })
                    listenAddress(item.buy_address, 'loadModuleMarket', () => {
                      dispatch(loadModule(marketAddress))
                    })
                  }
                })
                .then(() => market.call('next', [address]))
            }, firstAddress)
          ))
          .then(() => {
            dispatch({
              type: LOAD_MODULE,
              payload: {
                address: marketAddress,
                lots
              }
            })
            listenAddress(marketAddress, 'loadModule', (address) => {
              dispatch(loadModule(address))
            })
          });
      })
  }
}

export function dealLot(marketAddress, address) {
  return (dispatch) => {
    getContractByAbiName('Lot', address)
      .then(contract => contract.send('deal', [coinbase()]))
      .then((txId) => {
        dispatch(flashMessage('tx: ' + txId))
        return blockchain.subscribeTx(txId)
      })
      .then(() => {
        dispatch(flashMessage('Лот куплен'))
      })
  }
}

export function removeLot(marketAddress, address) {
  return (dispatch) => {
    getContractByAbiName('Market', marketAddress)
      .then(contract => contract.send('remove', [address]))
      .then((txId) => {
        dispatch(flashMessage('tx: ' + txId))
        return blockchain.subscribeTx(txId)
      })
      .then(() => {
        dispatch(flashMessage('Лот удален'))
      })
  }
}

export function approveLot(marketAddress, lot, token, value) {
  return (dispatch) => {
    getContractByAbiName('TokenEmission', token)
      .then(contract => contract.send('approve', [lot, value]))
      .then((txId) => {
        dispatch(flashMessage('tx: ' + txId))
        return blockchain.subscribeTx(txId)
      })
      .then(() => {
        dispatch(flashMessage('Дан доступ'))
      })
  }
}

function run(dispatch, address, func, values) {
  return getContractByAbiName('Market', address)
    .then(contract => contract.send(func, values))
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submit(marketAddress, action, form) {
  return (dispatch) => {
    dispatch(startSubmit('FormMarket'));
    let func
    switch (action) {
      case 'lot':
        func = 'append'
        break
      default:
        func = false;
    }
    if (func) {
      run(dispatch, marketAddress, func, _.values(form))
        .then((blockNumber) => {
          dispatch(stopSubmit('FormMarket'))
          dispatch(reset('FormMarket'))
          dispatch(flashMessage('blockNumber: ' + blockNumber))
        })
        .catch(() => {
          dispatch(stopSubmit('FormMarket'))
        })
    }
  }
}
