import { startSubmit, stopSubmit, reset } from 'redux-form';
import _ from 'lodash'
import { hashHistory } from 'react-router';
import i18next from 'i18next'
import { LOAD_START, LOAD, ADD_MODULE } from './actionTypes'
import { loadAbiByName, getContract, blockchain, createModule, createModuleWatch, getModuleAddress } from '../../utils/web3'
import { promiseFor } from '../../utils/helper'
import { flashMessage } from '../app/actions'

export function addModule(type, name, address) {
  return {
    type: ADD_MODULE,
    payload: {
      type,
      name,
      address
    }
  }
}

export function load(daoAddress) {
  return (dispatch) => {
    dispatch({
      type: LOAD_START,
      payload: true
    })
    let payload = {}
    loadAbiByName('Core')
      .then((abi) => {
        const core = getContract(abi, daoAddress);
        const blocks = [
          {
            name: i18next.t('dao:groupAuditors'),
            type: 'acl',
            modules: []
          },
          {
            name: i18next.t('dao:holder'),
            type: 'holder',
            modules: []
          },
          {
            name: i18next.t('dao:auditor'),
            type: 'auditor',
            modules: []
          },
          {
            name: i18next.t('dao:complier'),
            type: 'complier',
            modules: []
          },
          {
            name: i18next.t('dao:token'),
            type: 'token',
            modules: []
          },
          {
            name: i18next.t('dao:carbonRegistry'),
            type: 'token-acl',
            modules: []
          },
          {
            name: i18next.t('dao:market'),
            type: 'market',
            modules: []
          },
          {
            name: i18next.t('dao:docs'),
            type: 'docs',
            modules: []
          },
          {
            name: i18next.t('dao:agents'),
            type: 'agents',
            modules: []
          }
        ]
        core.call('first')
          .then(firstAddress => (
            promiseFor(address => address !== '0x0000000000000000000000000000000000000000', (address) => {
              let block;
              return core.call('abiOf', [address])
                .then((type) => {
                  if (type === 'https://github.com/airalab/core/blob/master/sol/acl/ACLStorage.sol') {
                    return 'acl'
                  }
                  if (type === 'tokenAcl') {
                    return 'token-acl'
                  }
                  return type
                })
                .then((type) => {
                  block = _.find(blocks, ['type', type])
                  if (block) {
                    return core.call('getName', [address])
                  }
                  return false;
                })
                .then((name) => {
                  if (name) {
                    let nameNew = name;
                    if (name === 'ipfs') {
                      nameNew = 'IPFS'
                    }
                    block.modules.push({
                      name: nameNew,
                      address
                    })
                  }
                })
                .then(() => core.call('next', [address]))
            }, firstAddress)
          ))
          .then(() => core.call('name'))
          .then((name) => {
            payload = {
              ...payload,
              address: daoAddress,
              name,
              blocks
            }
          })
          .then(() => core.call('owner'))
          .then((owner) => {
            dispatch({
              type: LOAD,
              payload: {
                ...payload,
                owner
              }
            })
          });
      })
  }
}

export function create(dispatch, module, values) {
  let builderAddress
  let builder
  return getModuleAddress(module)
    .then((address) => {
      builderAddress = address;
      return loadAbiByName(module)
    })
    .then((abi) => {
      builder = getContract(abi, builderAddress)
      return createModule(builder, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return createModuleWatch(builder)
    })
}

export function setModule(dispatch, daoAddress, name, address, type) {
  return loadAbiByName('Core')
    .then((abi) => {
      const core = getContract(abi, daoAddress);
      return core.send('set', [name, address, type, false])
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    .then(transaction => transaction.blockNumber)
}

export function submitCreateModule(form, action) {
  return (dispatch) => {
    let builder = false;
    switch (action) {
      case 'core':
        builder = 'BuilderOperator'
        break;
      case 'issuer':
        builder = 'BuilderIssuerLedger'
        break;
      case 'auditor':
        builder = 'BuilderAuditor'
        break;
      case 'complier':
        builder = 'BuilderComplier'
        break;
      case 'market':
        builder = 'BuilderMarket'
        break;
      case 'token':
        builder = 'BuilderTokenEmission'
        break;
      case 'tokenAcl':
        builder = 'BuilderTokenEmissionACL'
        break;
      case 'acl':
        builder = 'BuilderACLStorage'
        break;
      case 'docs':
        builder = 'BuilderDocs'
        break;
      default:
        break;
    }
    if (builder) {
      dispatch(startSubmit('FormCreator'));
      create(dispatch, builder, _.values(form))
        .then((address) => {
          dispatch(stopSubmit('FormCreator'))
          dispatch(reset('FormCreator'))
          dispatch(flashMessage('address: ' + address))
          if (action !== 'core' && action !== 'issuer' && action !== 'auditor' && action !== 'complier') {
            hashHistory.push('/dao/link/' + action + '/' + address)
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch(stopSubmit('FormCreator'))
        })
    }
  }
}

export function submitLinkModule(daoAddress, form) {
  return (dispatch) => {
    dispatch(startSubmit('FormLinkModule'));
    setModule(dispatch, daoAddress, form.name, form.address, form.type)
      .then((blockNumber) => {
        dispatch(stopSubmit('FormLinkModule'))
        dispatch(reset('FormLinkModule'))
        dispatch(flashMessage('blockNumber: ' + blockNumber))
        dispatch(addModule(form.type, form.name, form.address))
      })
      .catch(() => {
        dispatch(stopSubmit('FormLinkModule'))
      })
  }
}

function run(dispatch, address, abiName, action, values) {
  return loadAbiByName(abiName)
    .then((abi) => {
      const contract = getContract(abi, address);
      return contract.send(action, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return blockchain.subscribeTx(txId)
    })
    // .then(transaction => transaction.blockNumber)
}

export function submit(dispatch, formName, address, abiName, action, form) {
  dispatch(startSubmit(formName));
  return run(dispatch, address, abiName, action, _.values(form))
    .then((transaction) => {
      dispatch(stopSubmit(formName))
      dispatch(reset(formName))
      dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
      return transaction;
    })
    .catch(() => {
      dispatch(stopSubmit(formName))
      return Promise.reject();
    })
}

export function send(dispatch, address, abiName, action, values) {
  return run(dispatch, address, abiName, action, values)
    .then((transaction) => {
      dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
    })
}

export function call(dispatch, formName, contract, action, form) {
  dispatch(startSubmit(formName));
  return contract.call(action, _.values(form))
    .then((result) => {
      dispatch(stopSubmit(formName))
      return result
    })
    .catch(() => {
      dispatch(stopSubmit(formName))
    })
}

export function removeModule(address, name) {
  return (dispatch) => {
    send(dispatch, address, 'Core', 'remove', [name])
      .then(() => {
        dispatch(load(address))
      })
  }
}
