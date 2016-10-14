import { LOAD_MODULE, CALL_FUNC } from './actionTypes'
import { loadAbiByName, getContract, coinbase } from '../../utils/web3'
import { submit as submitContract, send as sendContract, call as callContract } from '../dao/actions'

export function loadModule(tokenAclAddress) {
  return (dispatch) => {
    loadAbiByName('TokenEmissionACL')
      .then((abi) => {
        const tokenAcl = getContract(abi, tokenAclAddress);
        let decimals = 1
        if (tokenAcl.decimals() > 0) {
          decimals = Math.pow(10, tokenAcl.decimals())
        }
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: tokenAclAddress,
            name: tokenAcl.name(),
            totalSupply: (tokenAcl.totalSupply() / decimals) + ' ' + tokenAcl.symbol(),
            balance: (tokenAcl.balanceOf(coinbase()) / decimals) + ' ' + tokenAcl.symbol(),
            // acl: tokenAcl.acl.address,
            aclGroup: tokenAcl.emitentGroup()
          }
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormTokenAcl', address, 'TokenEmissionACL', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'TokenEmissionACL', action, values)
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
    callContract(dispatch, 'FormTokenAclFunc', address, 'TokenEmissionACL', action, form)
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
