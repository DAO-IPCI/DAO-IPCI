import _ from 'lodash'
import Promise from 'bluebird'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(auditorAddress) {
  return (dispatch) => {
    let payload = {
      address: auditorAddress
    }
    getContractByAbiName('Auditor', auditorAddress)
      .then(contract => (
        Promise.join(
          contract.call('token'),
          contract.call('insuranceHolder'),
          contract.call('emissionValue'),
          contract.call('emissionLimit'),
          contract.call('holdPercentage'),
          (token, holder, value, limit, percentage) => (
            {
              token,
              holder,
              value: _.toNumber(value),
              limit: _.toNumber(limit),
              percentage: _.toNumber(percentage)
            }
          )
        )
      ))
      .then((auditor) => {
        payload = {
          ...payload,
          ...auditor
        }
      })
      .then(() => getContractByAbiName('TokenEmission', payload.token))
      .then(contract => (
        Promise.join(
          contract.call('decimals'),
          contract.call('symbol'),
          contract.call('balanceOf', [auditorAddress]),
          (decimalsR, symbol, balance) => {
            let decimals = decimalsR
            if (decimals > 0) {
              decimals = Math.pow(10, decimals)
            } else {
              decimals = 1
            }
            return (_.toNumber(balance) / decimals) + ' ' + symbol
          }
        )
      ))
      .then((balance) => {
        dispatch({
          type: LOAD_MODULE,
          payload: {
            ...payload,
            balance
          }
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
