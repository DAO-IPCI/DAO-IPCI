/* eslint no-constant-condition: 0 */
import { startSubmit, stopSubmit, reset } from 'redux-form'
import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, tx, coinbase } from '../../utils/web3'
import { flashMessage } from '../app/actions'

export function loadModule(marketAddress) {
  return (dispatch) => {
    let market
    let tokenAbi
    loadAbiByName('Market')
      .then((abi) => {
        market = getContract(abi, marketAddress);
        return loadAbiByName('TokenEmission')
      })
      .then((abi) => {
        tokenAbi = abi
        return loadAbiByName('Lot')
      })
      .then((abi) => {
        const lots = [];
        for (
          let address = market.first();
          address !== '0x0000000000000000000000000000000000000000';
          address = market.next(address)
        ) {
          const lot = getContract(abi, address)
          if (!lot.closed()) {
            const sale = lot.sale()
            const buy = lot.buy()
            const tokenSale = getContract(tokenAbi, sale)
            const tokenBuy = getContract(tokenAbi, buy)
            let saleApprove = _.toNumber(tokenSale.allowance(lot.seller(), address))
            const saleBalance = _.toNumber(tokenSale.balanceOf(lot.seller()))
            saleApprove = saleApprove > saleBalance ? saleBalance : saleApprove;
            let buyApprove = _.toNumber(tokenBuy.allowance(coinbase(), address))
            const buyBalance = _.toNumber(tokenBuy.balanceOf(coinbase()))
            buyApprove = buyApprove > buyBalance ? buyBalance : buyApprove;
            try {
              lots.push({
                address,
                seller: lot.seller(),
                buyer: lot.buyer(),
                sale_address: sale,
                buy_address: buy,
                sale_name: tokenSale.name(),
                buy_name: tokenBuy.name(),
                sale_quantity: _.toNumber(lot.quantity_sale()),
                buy_quantity: _.toNumber(lot.quantity_buy()),
                approve_sale_quantity: saleApprove,
                approve_buy_quantity: buyApprove,
                my: (lot.seller() === coinbase())
              })
            } catch (e) {
              console.log('load lot err token info', e);
            }
          }
        }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: marketAddress,
            lots
          }
        })
      })
  }
}

export function dealLot(marketAddress, address) {
  return (dispatch) => {
    loadAbiByName('Lot')
      .then((abi) => {
        const contract = getContract(abi, address);
        return tx(contract, 'deal', [coinbase()])
      })
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
    loadAbiByName('Market')
      .then((abi) => {
        const contract = getContract(abi, marketAddress);
        return tx(contract, 'remove', [address])
      })
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
    loadAbiByName('TokenEmission')
      .then((abi) => {
        const contract = getContract(abi, token);
        return tx(contract, 'approve', [lot, value])
      })
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
  return loadAbiByName('Market')
    .then((abi) => {
      const market = getContract(abi, address);
      return tx(market, func, values)
    })
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
