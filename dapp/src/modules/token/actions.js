import { LOAD_MODULE, CALL_FUNC } from './actionTypes'
import { loadAbiByName, getContract, coinbase } from '../../utils/web3'
import { submit as submitContract, send as sendContract, call as callContract } from '../dao/actions'

export function loadModule(tokenAddress) {
  return (dispatch) => {
    loadAbiByName('TokenEmission')
      .then((abi) => {
        const token = getContract(abi, tokenAddress);
        let decimals = 1
        if (token.decimals() > 0) {
          decimals = Math.pow(10, token.decimals())
        }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: tokenAddress,
            name: token.name(),
            totalSupply: (token.totalSupply() / decimals) + ' ' + token.symbol(),
            balance: (token.balanceOf(coinbase()) / decimals) + ' ' + token.symbol()
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

function normalResultCall(contract, action, result) {
  if (action === 'balanceOf') {
    let decimals = 1
    if (contract.decimals() > 0) {
      decimals = Math.pow(10, contract.decimals())
    }
    return (result.toString() / decimals) + ' ' + contract.symbol()
  }
  return result.toString()
}

export function call(address, action, form) {
  return (dispatch) => {
    callContract(dispatch, 'FormTokenFunc', address, 'TokenEmission', action, form)
      .then((ret) => {
        dispatch({
          type: CALL_FUNC,
          payload: {
            address,
            action,
            input: form,
            output: normalResultCall(ret[0], action, ret[1])
          }
        })
      })
  }
}
