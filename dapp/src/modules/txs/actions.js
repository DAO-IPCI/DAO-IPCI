import axios from 'axios'
import _ from 'lodash'
import { ADD, LOAD } from './actionTypes'
import { getWeb3 } from '../../utils/web3'

export function add(tx) {
  return {
    type: ADD,
    payload: tx
  }
}

export function load() {
  return (dispatch, getState) => {
    const state = getState();
    const registry = _.reduce(state.dao.blocks, (result, item) => {
      const r2 = _.reduce(item.modules, (r, module) => {
        _.set(r, module.address, module.name);
        return r;
      }, {});
      return _.merge(r2, result)
    }, {});
    const count = _.keys(registry).length
    if (count > 0) {
      const web3 = getWeb3();
      dispatch({
        type: LOAD,
        payload: true
      })
      let i = 0;
      _.forEach(registry, (name, address) => {
        axios.get('http://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken')
          .then((result) => {
            _.forEach(result.data.result, (tx) => {
              dispatch(add(
                {
                  txId: tx.hash,
                  from: tx.from,
                  to: tx.to,
                  toName: name,
                  timestamp: tx.timeStamp,
                  input: tx.input,
                  ascii: web3.toAscii(tx.input),
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
