import _ from 'lodash'
import Promise from 'bluebird'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, listenAddress } from '../../utils/web3'
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
            const decimalsFormat = _.toNumber(decimalsR)
            let decimals = decimalsFormat
            if (decimals > 0) {
              decimals = Math.pow(10, decimals)
            } else {
              decimals = 1
            }
            return (_.toNumber(balance) / decimals).toFixed(decimalsFormat) + ' ' + symbol
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
        listenAddress(auditorAddress, 'loadModule', (address) => {
          dispatch(loadModule(address))
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    const formData = form;
    if (action === 'emission' || action === 'transfer' || action === 'setEmissionLimit') {
      getContractByAbiName('Auditor', address)
        .then(contract => contract.call('token'))
        .then(token => getContractByAbiName('TokenEmissionACL', token))
        .then(contract => contract.call('decimals'))
        .then((result) => {
          let decimals = _.toNumber(result)
          if (decimals > 0) {
            decimals = Math.pow(10, decimals)
          } else {
            decimals = 1
          }
          if (action === 'setEmissionLimit') {
            formData.limit *= decimals
          } else {
            formData.value *= decimals
          }
          dispatch(submitContract('FormAuditor', address, 'Auditor', action, formData))
        })
    } else {
      dispatch(submitContract('FormAuditor', address, 'Auditor', action, formData))
    }
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Auditor', action, values)
  }
}
