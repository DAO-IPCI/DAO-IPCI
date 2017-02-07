import _ from 'lodash'
import Promise from 'bluebird'
import { LOAD_MODULE, CALL_FUNC } from './actionTypes'
import { getContractByAbiName, coinbase } from '../../utils/web3'
import { submit as submitContract, send as sendContract, call as callContract } from '../dao/actions'

export function loadModule(tokenAddress) {
  return (dispatch) => {
    getContractByAbiName('TokenEmission', tokenAddress)
      .then(contract => (
        Promise.join(
          contract.call('name'),
          contract.call('decimals'),
          contract.call('symbol'),
          contract.call('balanceOf', [coinbase()]),
          contract.call('totalSupply'),
          (name, decimalsR, symbol, balance, totalSupply) => {
            let decimals = decimalsR
            if (decimals > 0) {
              decimals = Math.pow(10, decimals)
            } else {
              decimals = 1
            }
            return {
              name,
              balance: (_.toNumber(balance) / decimals) + ' ' + symbol,
              totalSupply: (_.toNumber(totalSupply) / decimals) + ' ' + symbol
            }
          }
        )
      ))
      .then((token) => {
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: tokenAddress,
            ...token
          }
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormToken', address, 'TokenEmission', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'TokenEmission', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

function normalResultCall(contract, action, output) {
  if (action === 'balanceOf') {
    let decimals
    return contract.call('decimals')
      .then((result) => {
        decimals = result
        return contract.call('symbol')
      })
      .then((symbol) => {
        if (decimals > 0) {
          decimals = Math.pow(10, decimals)
        } else {
          decimals = 1
        }
        return (_.toNumber(output) / decimals) + ' ' + symbol
      })
  }
  return output.toString()
}

export function call(address, action, form) {
  return (dispatch) => {
    let contract
    getContractByAbiName('TokenEmission', address)
      .then((result) => {
        contract = result
        return callContract(dispatch, 'FormTokenFunc', contract, action, form)
      })
      .then(result => normalResultCall(contract, action, result))
      .then((result) => {
        dispatch({
          type: CALL_FUNC,
          payload: {
            address,
            action,
            input: form,
            output: result
          }
        })
      })
  }
}
