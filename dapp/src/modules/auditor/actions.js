import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'
import { loadAbiByName, getContract } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(auditorAddress) {
  return (dispatch) => {
    let auditor
    loadAbiByName('Auditor')
      .then((abi) => {
        auditor = getContract(abi, auditorAddress);
        return loadAbiByName('TokenEmission')
      })
      .then((tokenAbi) => {
        const tokenAddr = auditor.token()
        const token = getContract(tokenAbi, tokenAddr)
        let decimals = 1
        if (token.decimals() > 0) {
          decimals = Math.pow(10, token.decimals())
        }
        const balance = _.toNumber(token.balanceOf(auditorAddress))
        dispatch({
          type: LOAD_MODULE,
          payload: {
            address: auditorAddress,
            token: tokenAddr,
            holder: auditor.insuranceHolder(),
            value: _.toNumber(auditor.emissionValue()),
            limit: _.toNumber(auditor.emissionLimit()),
            percentage: _.toNumber(auditor.holdPercentage()),
            balance: (balance / decimals) + ' ' + token.symbol()
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
