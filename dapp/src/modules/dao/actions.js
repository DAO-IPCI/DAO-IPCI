import { startSubmit, stopSubmit, reset } from 'redux-form';
import Promise from 'bluebird'
import _ from 'lodash'
import { hashHistory } from 'react-router';
import i18next from 'i18next'
import hett from 'hett'
import { LOAD_START, LOAD, ADD_MODULE } from './actionTypes'
import { promiseFor, createModule, createModuleWatch } from '../../utils/helper'
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

const getModule = (core, address) => (
  Promise.join(
    core.call('abiOf', [address]),
    core.call('getName', [address]),
    (...info) => {
      let type = info[0]
      if (type === 'https://github.com/airalab/core/blob/master/sol/acl/ACLStorage.sol') {
        type = 'acl'
      } else if (type === 'tokenAcl') {
        type = 'token-acl'
      } else if (type === '') {
        type = 'agents'
      }
      let name = info[1];
      if (name === 'ipfs') {
        name = 'IPFS'
      }
      return {
        address,
        type,
        name
      }
    }
  )
  .catch(() => {
    console.log(address, 'skip')
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     getModule(core, address)
    //       .then((r) => {
    //         console.log(r)
    //         resolve(r)
    //       })
    //   }, 3000);
    // })
    return {
      address,
      type: 'skip',
      name: ''
    }
  })
)

export function load(daoAddress) {
  return (dispatch) => {
    dispatch({
      type: LOAD_START,
      payload: true
    })
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
        name: i18next.t('dao:commitment'),
        type: 'commitment',
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
    let core;
    const addresses = []
    hett.getContractByName('Core', daoAddress)
      .then((contract) => {
        core = contract;
        return core.call('first')
      })
      .then(first => (
        promiseFor(address => (address !== '0x0000000000000000000000000000000000000000' && address !== '0x'), (address) => {
          addresses.push(address)
          console.log(address);
          return core.call('next', [address])
            .then((r) => {
              if (r === '0x') {
                return core.call('next', [address])
              }
              return r
            })
            .catch(() => '0x')
        }, first)
      ))
      .then(() => {
        const modules = [];
        _.forEach(addresses, (address) => {
          modules.push(getModule(core, address));
        })
        return Promise.all(modules)
      })
      .then((modules) => {
        _.forEach(modules, (module) => {
          const block = _.find(blocks, ['type', module.type])
          if (block) {
            let name = module.name
            if (name === 'ACLStorage') {
              name = 'List of Independent Entities'
            }
            block.modules.push({
              name,
              address: module.address
            })
          }
        })
        return Promise.join(
          core.call('name'),
          core.call('owner'),
          (...info) => (
            {
              name: info[0],
              owner: info[1]
            }
          )
        )
      })
      .then((info) => {
        dispatch({
          type: LOAD,
          payload: {
            address: daoAddress,
            ...info,
            blocks
          }
        })
      })
  }
}

export function create(dispatch, module, values) {
  let builderAddress
  let builder
  return hett.getAddressByName(module)
    .then((address) => {
      builderAddress = address;
      return hett.getContractByName(module, builderAddress)
    })
    .then((contract) => {
      builder = contract;
      return createModule(builder, values)
    })
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return createModuleWatch(builder)
    })
}

export function setModule(dispatch, daoAddress, name, address, type) {
  return hett.getContractByName('Core', daoAddress)
    .then(core => (
      core.send('set', [name, address, type, false])
    ))
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return hett.watcher.addTx(txId)
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
      case 'commitment':
        builder = 'BuilderCommitment'
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
        builder = 'BuilderTokenWithValidityPeriod'
        break;
      case 'acl':
        builder = 'BuilderACLStorage'
        break;
      case 'holder':
        builder = 'BuilderInsuranceHolder'
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

function run(dispatch, address, abiName, action, values, txArgs = {}) {
  return hett.getContractByName(abiName, address)
    .then(contract => (
      contract.send(action, values, txArgs)
    ))
    .then((txId) => {
      dispatch(flashMessage('txId: ' + txId))
      return hett.watcher.addTx(txId)
    })
    // .then(transaction => transaction.blockNumber)
}

export function submit(formName, address, abiName, action, form, txArgs = {}) {
  return (dispatch, getState) => {
    dispatch(startSubmit(formName));
    let values = _.values(form);
    let isIpfs = false;
    if (_.has(form, 'isIpfs')) {
      isIpfs = form.isIpfs;
      values = _.values(_.omit(form, 'isIpfs'));
    }
    return run(dispatch, address, abiName, action, values, txArgs)
      .then((transaction) => {
        dispatch(stopSubmit(formName))
        dispatch(reset(formName))
        dispatch(flashMessage('blockNumber: ' + transaction.blockNumber))
        return transaction;
      })
      .then((transaction) => {
        if (isIpfs) {
          const state = getState()
          let docs = null;
          if (_.has(state, 'dao') && _.has(state.dao, 'blocks') && !_.isEmpty(state.dao.blocks)) {
            const block = _.find(state.dao.blocks, { type: 'docs' });
            if (block && !_.isEmpty(block.modules)) {
              docs = block.modules[0];
            }
          }
          if (docs) {
            dispatch(flashMessage(i18next.t('common:saveDoc') + ': ' + transaction.hash))
            setTimeout(() => {
              hashHistory.push('/dao/docs/append/' + docs.address + '/' + transaction.hash)
            }, 3000);
          } else {
            dispatch(flashMessage(i18next.t('common:noSaveDoc')))
          }
        }
        return transaction;
      })
      .catch(() => {
        dispatch(stopSubmit(formName))
        return Promise.reject();
      })
  }
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
