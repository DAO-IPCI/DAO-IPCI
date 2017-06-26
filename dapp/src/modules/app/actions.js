import Notifications from 'react-notification-system-redux';
import i18next from 'i18next'
import _ from 'lodash'
import { Cookies } from 'react-cookie'
import { SET_DAO_ADDRESS, SET_ROLE, SET_LANGUAGE } from './actionTypes'
import { add } from '../log/actions'

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
    if (!_.isEmpty(message)) {
      dispatch(add(message))
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

export function setLanguage(language) {
  i18next.changeLanguage(language)
  cookies.set('language', language);
  return {
    type: SET_LANGUAGE,
    payload: language
  }
}
