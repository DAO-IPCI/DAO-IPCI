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
    submitContract(dispatch, 'FormComplier', address, 'Complier', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Complier', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}
