import _ from 'lodash'
import cookie from 'react-cookie'
import { FLASH_MESSAGE, SET_DAO_ADDRESS, SET_ROLE } from './actionTypes'
import { add } from '../log/actions'

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
