/* eslint global-require: 0 */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Plugin from './shared/components/app/plugin'
import './index.html';

const startApp = () => {
  require('./app');
}
const notWeb3 = () => {
  render(
    <div className="container" id="maincontainer">
      <Plugin />
    </div>,
    document.getElementById('root')
  )
}
const notAccounts = () => {
  render(
    <div className="container" id="maincontainer">
      <p>not accounts</p>
    </div>,
    document.getElementById('root')
  )
}
const noAccess = () => {
  render(
    <div className="container" id="maincontainer">
      <p>no access</p>
    </div>,
    document.getElementById('root')
  )
}
const listeningChangeAccount = () => {
  let [account] = web3.eth.accounts
  const accountInterval = () => {
    if (web3.eth.accounts.length <= 0) {
      notAccounts();
    } else if (web3.eth.accounts[0] !== account) {
      [account] = web3.eth.accounts
      startApp();
    }
    setTimeout(() => {
      accountInterval()
    }, 1000)
  }
  accountInterval()
}
const checkAccount = () => {
  setTimeout(() => {
    if (window.web3.eth.accounts.length > 0) {
      startApp();
    } else if (window.web3.eth.accounts.length <= 0) {
      notAccounts();
    }
    listeningChangeAccount()
  }, 500)
}
const requestAccess = () => {
  window.ethereum.enable()
    .then(() => {
      checkAccount()
    })
    .catch((error) => {
      console.log(error)
      noAccess();
    })
}
window.addEventListener('load', () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    requestAccess()
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider)
    checkAccount()
  } else {
    notWeb3();
  }
})
