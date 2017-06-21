import i18next from 'i18next'
import _ from 'lodash'
import cookie from 'react-cookie'
import { FLASH_MESSAGE, SET_DAO_ADDRESS, SET_ROLE, SET_LANGUAGE, SET_MY_BALANCE, SET_BILLING_BALANCE, SET_LOCK_APP } from './actionTypes'
import { add } from '../log/actions'
import { coinbase, getContractByAbiName, getWeb3 } from '../../utils/web3'
import { BILLING_ADDR } from '../../config/config'
import { submit as submitContract } from '../dao/actions'

export function flashMessage(message) {
  return (dispatch) => {
    dispatch({
      type: FLASH_MESSAGE,
      payload: message
    })
    if (!_.isEmpty(message)) {
      dispatch(add(message))
    }
  }
}

export function setDaoAddress(address) {
  cookie.save('dao_address', address);
  return {
    type: SET_DAO_ADDRESS,
    payload: address
  }
}

export function setRole(role) {
  return {
    type: SET_ROLE,
    payload: role
  }
}

export function setBillingBalance(balance) {
  return {
    type: SET_BILLING_BALANCE,
    payload: balance
  }
}

export function setLockApp(status) {
  return {
    type: SET_LOCK_APP,
    payload: status
  }
}

export function setMyBalance(info) {
  return {
    type: SET_MY_BALANCE,
    payload: info
  }
}

export function updateBalance() {
  return (dispatch) => {
    const account = coinbase()
    const web3 = getWeb3();
    web3.eth.getBalance(account, (e, r) => {
      const balance = parseFloat(web3.fromWei(r, 'ether').toString())
      dispatch(setMyBalance(balance))
      getContractByAbiName('Billing', BILLING_ADDR)
        .then(contract => contract.call('balances', [account]))
        .then((result) => {
          const decimals = Math.pow(10, 18)
          let balanceBilling = Number(result)
          balanceBilling = (balanceBilling / decimals).toFixed(18);
          dispatch(setBillingBalance(balanceBilling))
          if (balanceBilling < 0) {
            dispatch(setLockApp(true))
          } else {
            dispatch(setLockApp(false))
          }
        })
    })
  }
}

export function burnBalance(address, action, form) {
  return (dispatch) => {
    const formData = form;
    if (action === 'payment') {
      const decimals = Math.pow(10, 18)
      formData.value *= decimals
      dispatch(submitContract('FormLock', address, 'Billing', action, [], { value: formData.value }))
        .then(() => {
          dispatch(updateBalance())
        })
    }
  }
}

export function setLanguage(language) {
  i18next.changeLanguage(language)
  cookie.save('language', language);
  return {
    type: SET_LANGUAGE,
    payload: language
  }
}
