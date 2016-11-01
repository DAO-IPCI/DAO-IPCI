import { LOAD_MODULE } from './actionTypes'
import { getContractByAbiName } from '../../utils/web3'
import { submit as submitContract, send as sendContract } from '../dao/actions'
import { promiseFor } from '../../utils/helper'

export function loadModule(aclAddress) {
  return (dispatch) => {
    getContractByAbiName('ACLStorage', aclAddress)
      .then((acl) => {
        const groups = [];
        acl.call('groupLength')
          .then((result) => {
            if (result > 0) {
              return promiseFor(index => index < result, index => (
                acl.call('group', [index])
                  .then((group) => {
                    const members = []
                    return acl.call('memberFirst', [group])
                      .then(firstAddress => (
                        promiseFor(address => address !== '0x0000000000000000000000000000000000000000', (address) => {
                          members.push(address)
                          return acl.call('memberNext', [group, address])
                        }, firstAddress)
                      ))
                      .then(() => (
                        groups.push({
                          name: group,
                          members
                        })
                      ))
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
                address: aclAddress,
                groups
              }
            })
          });
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    submitContract(dispatch, 'FormAcl', address, 'ACLStorage', action, form)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}

export function send(address, action, values) {
  return (dispatch) => {
    sendContract(dispatch, address, 'ACLStorage', action, values)
      .then(() => {
        dispatch(loadModule(address))
      })
  }
}
