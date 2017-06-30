import Notifications from 'react-notification-system-redux';
import i18next from 'i18next'
import { Cookies } from 'react-cookie'
import hett from 'hett'
import { SET_DAO_ADDRESS, SET_ROLE, SET_LANGUAGE, SET_MY_BALANCE, SET_BILLING_BALANCE, SET_LOCK_APP } from './actionTypes'
import { BILLING_ADDR } from '../../config/config'
import { submit as submitContract } from '../dao/actions'

const cookies = new Cookies();

export function flashMessage(message, type = 'info') {
  return (dispatch) => {
    const notificationOpts = {
      // title: 'Hey, it\'s good to see you!',
      message,
      position: 'tr',
      autoDismiss: 10
    };
    if (type === 'error') {
      dispatch(Notifications.error(notificationOpts))
    } else {
      dispatch(Notifications.info(notificationOpts))
    }
  }
}

export function setDaoAddress(address) {
  cookies.set('dao_address', address);
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
    const account = hett.web3h.coinbase()
    hett.web3.eth.getBalance(account, (e, r) => {
      const balance = parseFloat(hett.web3.fromWei(r, 'ether').toString())
      dispatch(setMyBalance(balance))
      hett.getContractByName('Billing', BILLING_ADDR)
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
  cookies.set('language', language);
  return {
    type: SET_LANGUAGE,
    payload: language
  }
}
