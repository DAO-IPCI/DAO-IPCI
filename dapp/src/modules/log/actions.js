import { ADD } from './actionTypes'

export function add(message) {
  return {
    type: ADD,
    payload: message
  }
}
