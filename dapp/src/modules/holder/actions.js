import _ from 'lodash'
import { LOAD_MODULE, CALL_FUNC } from './actionTypes'
import { getContractByAbiName } from '../../utils/web3'
import { submit as submitContract, send as sendContract, call as callContract } from '../dao/actions'

export function loadModule(holderAddress) {
  return (dispatch) => {
    let holder
    let token
    let decimals
    let symbol
    const payload = {
      address: holderAddress
    }
    getContractByAbiName('InsuranceHolder', holderAddress)
      .then((contract) => {
        holder = contract
        return holder.call('token')
      })
      .then((result) => {
        payload.token = result
        return holder.call('holdDuration')
      })
      .then((result) => {
        payload.holdDuration = _.toNumber(result)
        return getContractByAbiName('TokenEmission', payload.token)
      })
      .then((contract) => {
        token = contract
        return token.call('decimals')
      })
      .then((result) => {
        decimals = result
        if (decimals > 0) {
          decimals = Math.pow(10, decimals)
        } else {
          decimals = 1
        }
        return token.call('symbol')
      })
      .then((result) => {
        symbol = result
        return token.call('balanceOf', [holderAddress])
      })
      .then((result) => {
        payload.balance = (_.toNumber(result) / decimals) + ' ' + symbol
        dispatch({
          type: LOAD_MODULE,
          payload
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
    let contract
    getContractByAbiName('InsuranceHolder', address)
      .then((result) => {
        contract = result
        return callContract(dispatch, 'FormHolderFunc', contract, action, form)
      })
      .then((result) => {
        dispatch({
          type: CALL_FUNC,
          payload: {
            address,
            action,
            input: form,
            output: normalResultCall(contract, action, result)
          }
        })
      })
  }
}
