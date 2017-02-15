import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName, listenAddress } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'
import { promiseFor } from '../../utils/helper'

export function loadModule(docsAddress) {
  return (dispatch) => {
    getContractByAbiName('Docs', docsAddress)
      .then((contract) => {
        const docs = [];
        contract.call('count')
          .then((result) => {
            if (result > 0) {
              return promiseFor(index => index < result, index => (
                contract.call('list', [index])
                  .then((row) => {
                    docs.push({
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
            listenAddress(docsAddress, 'loadModule', (address) => {
              dispatch(loadModule(address))
            })
          });
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormDocs', address, 'Docs', action, form)
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'Docs', action, values)
  }
}
