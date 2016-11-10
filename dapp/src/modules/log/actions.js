import store from 'store'
import { ADD, LOAD } from './actionTypes'

export function add(message) {
  let logs = store.get('logs', [])
  logs.unshift(message)
  logs = logs.slice(0, 50)
  store.set('logs', logs)
  return {
    type: ADD,
    payload: message
  }
}

export function load() {
  const logs = store.get('logs', [])
  return {
    type: LOAD,
    payload: logs
  }
}
