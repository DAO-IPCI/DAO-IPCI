import _ from 'lodash'
import hett from 'hett'
import { LOAD_MODULE } from './actionTypes'
import { submit as submitContract, send as sendContract } from '../dao/actions'
import { promiseFor } from '../../utils/helper'

export function loadModule(docsAddress) {
  return (dispatch) => {
    hett.getContractByName('Docs', docsAddress)
      .then((contract) => {
        const docs = [];
        contract.call('count')
          .then((result) => {
            if (result > 0) {
              return promiseFor(index => index < result, index => (
                contract.call('list', [index])
                  .then((row) => {
                    docs.unshift({
                      txId: row[0],
                      doc: row[1],
                      owner: row[2]
                    })
                  })
                  .then(() => index + 1)
              ), 0)
            }
            return false;
          })
          .then(() => {
            dispatch({
              type: LOAD_MODULE,
              payload: {
                address: docsAddress,
                docs
              }
            })
            hett.watcher.addAddress(docsAddress, 'loadModule', (address) => {
              dispatch(loadModule(address))
            })
          });
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    let data = form
    let hash = ''
    if (action === 'append') {
      hash = data.hash
      data = _.omit(data, ['hash']);
    }
    dispatch(submitContract('FormDocs', address, 'Docs', action, data))
      .then(() => {
        if (action === 'append') {
          console.log('Pin cluster', hash);
        }
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Docs', action, values)
  }
}
