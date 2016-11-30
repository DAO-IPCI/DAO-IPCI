import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(auditorAddress) {
  return (dispatch) => {
    let auditor
    let token
    let decimals
    let symbol
    const payload = {
      address: auditorAddress
    }
    getContractByAbiName('Auditor', auditorAddress)
      .then((contract) => {
        auditor = contract
        return auditor.call('token')
      })
      .then((result) => {
        payload.token = result
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
        return token.call('balanceOf', [auditorAddress])
      })
      .then((result) => {
        payload.balance = (_.toNumber(result) / decimals) + ' ' + symbol
        return auditor.call('insuranceHolder')
      })
      .then((result) => {
        payload.holder = result
        return auditor.call('emissionValue')
      })
      .then((result) => {
        payload.value = _.toNumber(result)
        return auditor.call('emissionLimit')
      })
      .then((result) => {
        payload.limit = _.toNumber(result)
        return auditor.call('holdPercentage')
      })
      .then((result) => {
        payload.percentage = _.toNumber(result)
        dispatch({
          type: LOAD_MODULE,
          payload
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormAuditor', address, 'Auditor', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Auditor', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}
