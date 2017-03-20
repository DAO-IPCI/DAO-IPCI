import { LOAD_MODULE } from './actionTypes'
import { submit as submitContract, send as sendContract } from '../dao/actions'

export function loadModule(complierAddress) {
  return (dispatch) => {
    dispatch({
      type: LOAD_MODULE,
      payload: {
        address: complierAddress
      }
    })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    dispatch(submitContract('FormComplier', address, 'Complier', action, form))
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Complier', action, values)
  }
}
