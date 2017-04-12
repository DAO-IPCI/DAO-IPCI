import _ from 'lodash'
import Promise from 'bluebird'
import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, listenAddress } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(commitmentAddress) {
  return (dispatch) => {
    let payload = {
      address: commitmentAddress
    }
    getContractByAbiName('Commitment', commitmentAddress)
      .then(contract => (
        Promise.join(
          contract.call('tokenEmission'),
          contract.call('insuranceHolder'),
          contract.call('token'),
          contract.call('percentage'),
          contract.call('balance'),
          contract.call('emissionLimit'),
          (tokenEmission, holder, token, percentage, balanceContact, emissionLimit) => (
            {
              tokenEmission,
              token: (token !== '0x0000000000000000000000000000000000000000') ? token : '',
              holder,
              percentage: _.toNumber(percentage),
              balanceContact: _.toNumber(balanceContact),
              limit: _.toNumber(emissionLimit)
            }
          )
        )
      ))
      .then((commitment) => {
        payload = {
          ...payload,
          ...commitment
        }
      })
      .then(() => {
        if (payload.token) {
          return getContractByAbiName('TokenEmission', payload.token)
        }
        return false
      })
      .then((contract) => {
        if (contract) {
          return Promise.join(
            contract.call('decimals'),
            contract.call('symbol'),
            (decimalsR, symbol) => {
              const decimalsFormat = _.toNumber(decimalsR)
              let decimals = decimalsFormat
              if (decimals > 0) {
                decimals = Math.pow(10, decimals)
              } else {
                decimals = 1
              }
              return (_.toNumber(payload.balanceContact) / decimals).toFixed(decimalsFormat) + ' ' + symbol
            }
          )
        }
        return ''
      })
      .then((balanceContact) => {
        payload = {
          ...payload,
          balanceContact
        }
      })
      .then(() => getContractByAbiName('TokenEmission', payload.tokenEmission))
      .then(contract => (
        Promise.join(
          contract.call('decimals'),
          contract.call('symbol'),
          contract.call('balanceOf', [commitmentAddress]),
          (decimalsR, symbol, balance) => {
            const decimalsFormat = _.toNumber(decimalsR)
            let decimals = decimalsFormat
            if (decimals > 0) {
              decimals = Math.pow(10, decimals)
            } else {
              decimals = 1
            }
            return {
              balance,
              decimals,
              decimalsFormat,
              symbol
            }
          }
        )
      ))
      .then((tokenInfo) => {
        dispatch({
          type: LOAD_MODULE,
          payload: {
            ...payload,
            balanceTokenEmission: (_.toNumber(tokenInfo.balance) / tokenInfo.decimals).toFixed(tokenInfo.decimalsFormat) + ' ' + tokenInfo.symbol,
            limit: (_.toNumber(payload.limit) / tokenInfo.decimals).toFixed(tokenInfo.decimalsFormat) + ' ' + tokenInfo.symbol
          }
        })
        listenAddress(commitmentAddress, 'loadModule', (address) => {
          dispatch(loadModule(address))
        })
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    const formData = form;
    if (action === 'emission' || action === 'transfer') {
      getContractByAbiName('Commitment', address)
        .then(contract => contract.call('tokenEmission'))
        .then(token => getContractByAbiName('TokenEmissionACL', token))
        .then(contract => contract.call('decimals'))
        .then((result) => {
          let decimals = _.toNumber(result)
          if (decimals > 0) {
            decimals = Math.pow(10, decimals)
          } else {
            decimals = 1
          }
          formData.value *= decimals
          dispatch(submitContract('FormCommitment', address, 'Commitment', action, formData))
        })
    } else {
      dispatch(submitContract('FormCommitment', address, 'Commitment', action, formData))
    }
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Commitment', action, values)
  }
}
