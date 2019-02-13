import _ from 'lodash'
import hett from 'hett'
import { LOAD_MODULE } from './actionTypes'
import { submit as submitContract, send as sendContract } from '../dao/actions'
import { flashMessage } from '../app/actions'
import { promiseFor } from '../../utils/helper'
import getIpfs from '../../utils/ipfs'

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
      console.log('Pinning cluster', hash);
      getIpfs().then((ipfs) => {
        ipfs.pin.add(hash, (err, res) => {
          if (err || !res) {
            console.error(err)
            dispatch(flashMessage('File is not pinned to the cluster', 'error'))
            return false;
          }
          console.log('Pin cluster ok', hash, res);
          dispatch(submitContract('FormDocs', address, 'Docs', action, data))
          return true;
        })
      })
    } else {
      dispatch(submitContract('FormDocs', address, 'Docs', action, data))
    }
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Docs', action, values)
  }
}
