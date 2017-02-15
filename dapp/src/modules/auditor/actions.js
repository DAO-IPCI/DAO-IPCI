import _ from 'lodash'
import Promise from 'bluebird'
import { hashHistory } from 'react-router';
import i18next from 'i18next'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, listenAddress } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'
import { flashMessage } from '../app/actions'

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
  return (dispatch, getState) => {
    const state = getState()
    // if (_.has(state, 'dao')) {
    //   state.dao.blocks
    // }
    // console.log(state);
    submitContract(dispatch, 'FormAuditor', address, 'Auditor', action, form)
      .then((transaction) => {
        if (action === 'emission') {
          dispatch(flashMessage(i18next.t('common:saveDoc') + ': ' + transaction.hash))
          if (_.has(state, 'docs') && !_.isEmpty(state.docs.modules)) {
            const docs = state.docs.modules[0].address
            const url = '/dao/docs/append/' + docs + '/' + transaction.hash
            setTimeout(() => {
              hashHistory.push(url)
            }, 3000);
          }
        }
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Auditor', action, values)
  }
}
