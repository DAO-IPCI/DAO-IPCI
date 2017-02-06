import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, loadAbiByName, getContract, blockchain, coinbase } from '../../utils/web3'
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
              const item = {}
              let tokenSale
              let tokenBuy
              let saleApprove
              let buyApprove
              let isClosed
              return lot.call('closed')
                .then((closed) => {
                  isClosed = closed
                  if (!closed) {
                    item.address = address
                    return lot.call('seller')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.seller = result
                    item.my = (result === coinbase())
                    return lot.call('buyer')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.buyer = result
                    return lot.call('quantity_sale')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.sale_quantity = _.toNumber(result)
                    return lot.call('quantity_buy')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.buy_quantity = _.toNumber(result)
                    return lot.call('sale')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.sale_address = result
                    tokenSale = getContract(tokenAbi, item.sale_address)
                    return lot.call('buy')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.buy_address = result
                    tokenBuy = getContract(tokenAbi, item.buy_address)
                  }
                })
                .then(() => {
                  if (!isClosed) {
                    return tokenSale.call('name')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.sale_name = result
                  }
                  return false;
                })
                .then(() => {
                  if (!isClosed) {
                    return tokenBuy.call('name')
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    item.buy_name = result
                  }
                })
                .then(() => {
                  if (!isClosed) {
                    return tokenSale.call('allowance', [item.seller, address])
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    saleApprove = _.toNumber(result)
                    return tokenSale.call('balanceOf', [item.seller])
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    const saleBalance = _.toNumber(result)
                    item.approve_sale_quantity = saleApprove > saleBalance ?
                      saleBalance : saleApprove;
                  }
                })
                .then(() => {
                  if (!isClosed) {
                    return tokenBuy.call('allowance', [coinbase(), address])
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    buyApprove = _.toNumber(result)
                    return tokenBuy.call('balanceOf', [coinbase()])
                  }
                  return false;
                })
                .then((result) => {
                  if (!isClosed) {
                    const buyBalance = _.toNumber(result)
                    item.approve_buy_quantity = buyApprove > buyBalance ?
                      buyBalance : buyApprove;
                  }
                })
                .then(() => {
                  if (!isClosed) {
                    lots.push(item)
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
        dispatch(loadModule(marketAddress))
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
        dispatch(loadModule(marketAddress))
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
        dispatch(loadModule(marketAddress))
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
          dispatch(loadModule(marketAddress))
        })
        .catch(() => {
          dispatch(stopSubmit('FormMarket'))
        })
    }
  }
}
