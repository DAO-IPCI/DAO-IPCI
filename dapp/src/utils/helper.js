import Promise from 'bluebird'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import axios from 'axios'
import hett from 'hett'

export const promiseFor = Promise.method((condition, action, value) => {
  if (!condition(value)) return value;
  return action(value).then(promiseFor.bind(null, condition, action));
});
// promiseFor(count => count < 10, count => (
//   new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(count);
//       resolve(count + 1);
//     }, 250);
//   })
// ), 0)
//   .then(() => {
//     console.log('good');
//   });

export const formatDecimals = (price, decimals) => {
  const priceNum = new BigNumber(price);
  return priceNum.shift(-decimals).toNumber();
}

const getUrlAbi = (contract) => {
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

export class ProviderAbi {
  constructor(abis) {
    this.abis = {};
    this.setAbi(abis);
  }

  setAbi(abis) {
    this.abis = abis;
  }

  getAbi(name) {
    if (_.has(this.abis, name)) {
      return new Promise((resolve) => {
        resolve(this.abis[name]);
      });
    }
    return axios.get(getUrlAbi(name)).then(results => results.data)
  }
}

export class ProviderAddress {
  constructor(addresses) {
    this.addresses = {};
    this.setAddress(addresses);
  }

  setAddress(addresses) {
    this.addresses = addresses;
  }

  getAddress(name) {
    if (_.has(this.addresses, name)) {
      return new Promise((resolve) => {
        resolve(this.addresses[name]);
      });
    }
    return hett.getContractByName('Core', this.addresses.Factory)
      .then(factory => factory.call('get', [name]))
  }
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

function isAddress(address, required = true) {
  if (!required && (address === '' || address === '0')) {
    return true;
  }
  if (address && address.length === 42 && /^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return true;
  }
  return false;
}

export const validate = (values, props) => {
  const errors = {};
  _.each(props.fields, (item) => {
    if (item.required && !values[item.name]) {
      errors[item.name] = 'required'
    } else {
      let isError
      switch (item.validation) {
        case 'address':
          isError = isAddress(values[item.name], item.required) ? false : 'bad address'
          break;
        case 'uint':
          isError = _.isNumber(values[item.name] * 1) && !_.isNaN(values[item.name] * 1) ? false : 'no number'
          break;
        default:
          isError = false
      }
      if (isError) {
        errors[item.name] = isError
      }
    }
  })
  return errors
};
