import _ from 'lodash'
import { LOAD_MODULE, CALL_FUNC } from './actionTypes'
import { loadAbiByName, getContract } from '../../utils/web3'
import { submit as submitContract, send as sendContract, call as callContract } from '../dao/actions'

export function loadModule(holderAddress) {
  return (dispatch) => {
    let holder
    loadAbiByName('InsuranceHolder')
      .then((abi) => {
        holder = getContract(abi, holderAddress);
        return loadAbiByName('TokenEmission')
      })
      .then((tokenAbi) => {
        const tokenAddr = holder.token()
        const token = getContract(tokenAbi, tokenAddr)
        let decimals = 1
        if (token.decimals() > 0) {
          decimals = Math.pow(10, token.decimals())
        }
        const balance = _.toNumber(token.balanceOf(holderAddress))
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: holderAddress,
            token: tokenAddr,
            holdDuration: _.toNumber(holder.holdDuration()),
            balance: (balance / decimals) + ' ' + token.symbol()
          }
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormHolder', address, 'InsuranceHolder', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'InsuranceHolder', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

function normalResultCall(contract, action, result) {
  if (action === 'record') {
    return '<div>' +
        'Метка времени: ' + result[0] + ' (UNIX time)<br />' +
        'Величина взноса: ' + result[1] + '<br />' +
        'Состояние взноса: ' + ((result[2]) ? 'был выведен' : 'находится на балансе контракта') +
      '</div>'
  }
  return result.toString()
}

export function call(address, action, form) {
  return (dispatch) => {
    callContract(dispatch, 'FormHolderFunc', address, 'InsuranceHolder', action, form)
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
