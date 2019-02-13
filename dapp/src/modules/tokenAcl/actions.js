import _ from 'lodash'
import Promise from 'bluebird'
import hett from 'hett'
import { LOAD_MODULE, CALL_FUNC } from './actionTypes'
import { submit as submitContract, send as sendContract, call as callContract } from '../dao/actions'

export function loadModule(tokenAclAddress) {
  return (dispatch) => {
    let info = {
      name: '',
      aclGroup: '',
      balance: '',
      totalSupply: '',
      decimals: 0,
      timestamp: 0,
      period: 0
    }
    let contract
    hett.getContractByName('TokenWithValidityPeriod', tokenAclAddress)
      .then((r) => {
        contract = r
        return Promise.join(
          contract.call('name'),
          contract.call('emitentGroup'),
          contract.call('decimals'),
          contract.call('symbol'),
          contract.call('balanceOf', [hett.web3h.coinbase()]),
          contract.call('totalSupply'),
          (name, aclGroup, decimalsR, symbolR, balance, totalSupply) => {
            const decimalsFormat = _.toNumber(decimalsR)
            let decimals = decimalsFormat
            if (decimals > 0) {
              decimals = Math.pow(10, decimals)
            } else {
              decimals = 1
            }
            const symbol = symbolR
            return {
              name,
              aclGroup,
              balance: (_.toNumber(balance) / decimals).toFixed(decimalsFormat) + ' ' + symbol,
              totalSupply: (_.toNumber(totalSupply) / decimals).toFixed(decimalsFormat) + ' ' + symbol,
              decimals
            }
          }
        )
      })
      .then((token) => {
        info = { ...info, ...token }
        return Promise.join(
          contract.call('timestamp'),
          contract.call('period'),
          (timestamp, period) => (
            {
              timestamp: _.toNumber(timestamp),
              period: _.toNumber(period)
            }
          )
        )
        .catch(() => (
          {
            timestamp: 0,
            period: 0
          }
        ))
      })
      .then(period => (
        { ...info, ...period }
      ))
      .then((token) => {
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: tokenAclAddress,
            ...token
          }
        })
        hett.watcher.addAddress(tokenAclAddress, 'loadModule', (address) => {
          dispatch(loadModule(address))
        })
      })
      .catch((e) => {
        console.log(e);
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    const formData = form;
    if (action === 'emission' || action === 'transfer' || action === 'approve') {
      hett.getContractByName('TokenWithValidityPeriod', address)
        .then(contract => contract.call('decimals'))
        .then((result) => {
          let decimals = _.toNumber(result)
          if (decimals > 0) {
            decimals = Math.pow(10, decimals)
          } else {
            decimals = 1
          }
          formData.value *= decimals
          dispatch(submitContract('FormTokenAcl', address, 'TokenWithValidityPeriod', action, formData))
        })
    } else if (action === 'setPeriod') {
      formData.value = formData.value * 24 * 60 * 60;
      dispatch(submitContract('FormTokenAcl', address, 'TokenWithValidityPeriod', action, formData))
    } else {
      dispatch(submitContract('FormTokenAcl', address, 'TokenWithValidityPeriod', action, formData))
    }
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'TokenWithValidityPeriod', action, values)
  }
}

function normalResultCall(contract, action, output) {
  if (action === 'balanceOf') {
    let decimalsFormat
    let decimals
    return contract.call('decimals')
      .then((result) => {
        decimalsFormat = _.toNumber(result)
        decimals = decimalsFormat
        return contract.call('symbol')
      })
      .then((symbol) => {
        if (decimals > 0) {
          decimals = Math.pow(10, decimals)
        } else {
          decimals = 1
        }
        return (_.toNumber(output) / decimals).toFixed(decimalsFormat) + ' ' + symbol
      })
  }
  return output.toString()
}

export function call(address, action, form) {
  return (dispatch) => {
    let contract
    hett.getContractByName('TokenWithValidityPeriod', address)
      .then((result) => {
        contract = result
        return callContract(dispatch, 'FormTokenAclFunc', contract, action, form)
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
