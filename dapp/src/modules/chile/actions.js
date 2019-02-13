import hett from 'hett'
import Promise from 'bluebird'
import axios from 'axios'
import _ from 'lodash'
import { RUN_LOAD, LOAD, SET_DATA_HASH, SET_DATA, SET_FACTOR_HASH, SET_FACTOR } from './actionTypes'
import { loadModule as loadModuleAcl } from '../tokenAcl/actions'
import { submit as submitContract } from '../dao/actions'
import getIpfs from '../../utils/ipfs'

const URL_API = 'https://devjs-01.corp.aira.life:3010'

const getInfo = account => (
  axios.get(URL_API + '/data/' + account)
    .then(r => r.data)
)

const postInfo = (account, txHash, value) => (
  axios.post(URL_API + '/em/', {
    account,
    hash: txHash,
    amount: value
  })
)

const getData = (hash) => {
  console.log('file', hash);
  return getIpfs().then(ipfs => (
    new Promise((resolve, reject) => {
      console.log('start get file');
      ipfs.cat(hash, (e, res) => {
        if (e) {
          console.log(e)
          reject(e)
        }
        let data = ''
        res.on('data', (d) => {
          data += d
        })
        res.on('end', () => {
          const file = data.toString('utf8')
          console.log(file);
          const arr = file.split('\n').splice(8)
          console.log(arr)
          let sum = 0
          const obj = {}
          arr.forEach((item) => {
            if (item !== '') {
              const line = item.trim().substring(1, item.length - 2).split('","')
              obj[line[0]] = Number(line[1])
              sum += obj[line[0]]
            }
          })
          console.log(sum);
          resolve(Number(sum))
        })
      })
    })
  ))
}

const getFactor = hash => (
  getIpfs().then(ipfs => (
    new Promise((resolve, reject) => {
      ipfs.cat(hash, (e, res) => {
        if (e) {
          reject(e)
        }
        let data = ''
        res.on('data', (d) => {
          data += d
        })
        res.on('end', () => {
          const factor = data.toString('utf8').split('	') /* eslint no-tabs: 0 */
          resolve(Number(factor[0]))
        })
      })
    })
  ))
)

export function changeData(hash) {
  return (dispatch) => {
    if (hash) {
      dispatch({
        type: SET_DATA_HASH,
        payload: hash
      })
      getData(hash)
        .then((data) => {
          dispatch({
            type: SET_DATA,
            payload: data
          })
        })
    }
  }
}

export function changeFactor(hash) {
  return (dispatch) => {
    if (hash) {
      dispatch({
        type: SET_FACTOR_HASH,
        payload: hash
      })
      getFactor(hash)
        .then((factor) => {
          dispatch({
            type: SET_FACTOR,
            payload: factor
          })
        })
    }
  }
}

export function loadModule() {
  return (dispatch) => {
    dispatch({
      type: RUN_LOAD
    })
    const account = hett.web3h.coinbase()
    getInfo(account)
      .then((result) => {
        if (result.error) {
          dispatch({
            type: LOAD,
            payload: {
              account,
              errorLoad: true
            }
          })
        } else {
          dispatch({
            type: LOAD,
            payload: {
              account,
              token: result.token,
              info: {
                countDevice: result.countDevice,
                dateStart: result.dateStart,
                dateEnd: result.dateEnd,
                check: result.check,
              }
            }
          })
          dispatch(loadModuleAcl(result.token))
        }
      })
  }
}

export function submit(address, action, form) {
  return (dispatch) => {
    const formData = form;
    return hett.getContractByName('TokenWithValidityPeriod', address)
      .then(contract => contract.call('decimals'))
      .then((result) => {
        let decimals = _.toNumber(result)
        if (decimals > 0) {
          decimals = Math.pow(10, decimals)
        } else {
          decimals = 1
        }
        formData.value *= decimals
        return dispatch(submitContract('FormTokenAcl', address, 'TokenWithValidityPeriod', action, formData))
      })
      .then((r) => {
        const account = hett.web3h.coinbase()
        return postInfo(account, r.hash, formData.value)
      })
      .then(() => {
        dispatch(loadModule())
      })
  }
}
