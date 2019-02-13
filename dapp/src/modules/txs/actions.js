import axios from 'axios'
import Promise from 'bluebird'
import _ from 'lodash'
import hett from 'hett'
import { ADD, LOAD } from './actionTypes'
import { ETHERSCAN_API_KEY } from '../../config/config'

export function add(tx) {
  return {
    type: ADD,
    payload: tx
  }
}

function promiseDebounce(fn, delay, count) {
  let working = 0
  const queue = []
  function work() {
    if ((queue.length === 0) || (working === count)) return
    working += 1
    Promise.delay(delay).tap(() => { working -= 1 }).then(work)
    const next = queue.shift()
    next[2](fn.apply(next[0], next[1]))
  }
  return function debounced(...args) {
    return new Promise((resolve) => {
      queue.push([this, args, resolve])
      if (working < count) work()
    })
  }
}

axios.get = promiseDebounce(axios.get, 1000, 3)

function api(command) {
  return axios.get('https://api.etherscan.io/api?' + command + '&apikey=' + ETHERSCAN_API_KEY)
}

export function load() {
  return (dispatch, getState) => {
    const state = getState();
    const registry = {};
    const agents = {};
    if (!_.isEmpty(state.dao.address)) {
      _.set(registry, state.dao.address, state.dao.name);
    }
    _.forEach(state.dao.blocks, (item) => {
      _.forEach(item.modules, (module) => {
        if (item.type !== 'agents') {
          _.set(registry, module.address, module.name);
        } else {
          _.set(agents, module.address, module.name);
        }
      });
    });
    const count = _.keys(registry).length
    if (count > 0) {
      dispatch({
        type: LOAD,
        payload: true
      })
      let i = 0;
      _.forEach(registry, (name, address) => {
        api('module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&sort=asc')
          .then((result) => {
            _.forEach(result.data.result, (tx) => {
              dispatch(add(
                {
                  txId: tx.hash,
                  from: tx.from,
                  fromName: (_.has(agents, tx.from)) ? agents[tx.from] : '',
                  to: tx.to,
                  toName: name,
                  timestamp: tx.timeStamp,
                  input: tx.input,
                  ascii: hett.web3.toAscii(tx.input),
                }
              ))
            });
            i += 1;
            if (i >= count) {
              dispatch({
                type: LOAD,
                payload: false
              })
            }
          })
          .catch((e) => {
            console.log(e);
          })
      });
    }
  }
}
