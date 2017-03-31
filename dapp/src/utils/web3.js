import Promise from 'bluebird'
import _ from 'lodash'
import axios from 'axios'
import Blockchain from './blockchain'
import abis from './abi'
import addresses from './address'
import Contract from './contract'

export function getWeb3() {
  if (typeof web3 !== 'undefined' && typeof Web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else if (typeof Web3 !== 'undefined') {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  } else if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
    return false
  }
  return web3
}

export function getAccounts() {
  return web3.eth.accounts
}

let indexAccount = 0
export function setAccount(index) {
  indexAccount = index
}

export function coinbase() {
  return web3.eth.accounts[indexAccount]
}

export function getBalance(address) {
  return parseFloat(web3.fromWei(web3.eth.getBalance(address), 'ether').toString())
}

export function isAccounts() {
  if (web3.eth.accounts.length > 0) {
    return true
  }
  return false
}

export function transfer(from, to, value, isEther = true) {
  return new Promise((resolve, reject) => {
    web3.eth.sendTransaction({
      from,
      to,
      value: (isEther) ? web3.toWei(value, 'ether') : value
    }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  });
}

export function getTransaction(txId) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(txId, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  });
}

export function getContract(abi, address) {
  return new Contract(abi, address)
}

export function getUrlAbi(contract) {
  let isBuilder = false;
  if (/builder/i.test(contract)) {
    isBuilder = true;
  }
  const ipci = [
    'BuilderAuditor',
    'BuilderComplier',
    'BuilderInsuranceHolder',
    'BuilderIssuerLedger',
    'BuilderOperator',
    'Auditor',
    'Complier',
    'InsuranceHolder',
  ]
  let repo = 'core'
  let version = '64e36c8ea43bb06ae8dd81a65af6d769b366f3c1';
  if (_.indexOf(ipci, contract) >= 0) {
    repo = 'DAO-IPCI'
    version = '79c192ff18abe5c78f1d1ec607dee03b5641dbcc';
  } else if (isBuilder) {
    repo = 'DAO-Factory'
    version = 'cb5b7c0ad9203e773b1db058540846e62a2931ff';
  }
  let url = 'https://raw.githubusercontent.com/airalab/' + repo + '/' + version + '/abi/'
  if (isBuilder && repo === 'DAO-IPCI') {
    url += 'builder/'
  }
  url += contract + '.json'
  return url
}

function loadAbi(url) {
  return axios.get(url)
    .then(results => results.data);
}

export function loadAbiByName(name) {
  if (_.has(abis, name)) {
    return new Promise((resolve) => {
      resolve(abis[name]);
    });
  }
  return loadAbi(getUrlAbi(name));
}

export function getContractByAbiName(name, address) {
  return loadAbiByName(name)
    .then(abi => getContract(abi, address))
}

export const blockchain = new Blockchain(getWeb3())

export function getFactory() {
  return loadAbiByName('Core')
    .then(abi => getContract(abi, addresses.Factory))
}

export function getModuleAddress(module) {
  if (_.has(addresses, module)) {
    return new Promise((resolve) => {
      resolve(addresses[module]);
    });
  }
  return getFactory()
    .then(factory => factory.call('get', [module]))
}

export function createModule(cotract, args) {
  return cotract.call('buildingCostWei')
    .then((result) => {
      args.push(0) // client
      return cotract.send('create', args, { value: result })
    })
}

export function createModuleWatch(cotract) {
  return cotract.watch('Builded')
    .then(params => params.instance)
}

let listeners = {}
export function listenAddress(address, name, cb) {
  if (!_.has(listeners, address) || !_.has(listeners, [address, name])) {
    listeners = _.set(listeners, [address, name], cb)
  }
}
export function runListener() {
  if (getWeb3()) {
    blockchain.setSubscribe((bl) => {
      _.forEach(bl.transactions, (txId) => {
        getTransaction(txId)
          .then((info) => {
            if (_.has(listeners, info.from) || _.has(listeners, info.to)) {
              _.forEach(listeners[info.from], (cb) => {
                cb(info.from)
              });
            }
            if (_.has(listeners, info.to)) {
              _.forEach(listeners[info.to], (cb) => {
                cb(info.to)
              });
            }
          });
      })
    })
  }
}
