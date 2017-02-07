import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookie from 'react-cookie'
import { getWeb3, isAccounts, runListener } from '../../utils/web3'

import Header from '../components/app/header'
import Footer from '../components/app/footer'
import Notification from '../components/app/notification'
import { flashMessage, setDaoAddress, setLanguage } from '../../modules/app/actions';
import { load } from '../../modules/log/actions';

import './style.css'

// @translate(['view', 'nav'], { wait: true })
class App extends Component {
  componentWillMount() {
    const address = cookie.load('dao_address')
    if (address) {
      this.props.setDaoAddress(address)
    }
    const language = cookie.load('language')
    if (language) {
      this.props.setLanguage(language)
    }
    this.props.loadLog()
    runListener();
  }

  render() {
    let content
    if (getWeb3()) {
      if (isAccounts()) {
        content = this.props.children
      } else {
        content = <p>нет аккаунтов</p>
      }
    } else {
      content = <p>нужен mist</p>
    }

    return (<div>
      <Header
        title={this.props.title}
        dao_address={this.props.dao_address}
        language={this.props.language}
        setLanguage={this.props.setLanguage}
      />
      <div className="container">
        {content}
      </div>
      <Footer />
      <Notification message={this.props.flash_message} onClose={() => this.props.flashMessage('')} />
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    title: state.app.title,
    flash_message: state.app.flash_message,
    dao_address: state.app.dao_address,
    language: state.app.language
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    flashMessage,
    setDaoAddress,
    setLanguage,
    load
  }, dispatch)
  return {
    flashMessage: actions.flashMessage,
    setDaoAddress: actions.setDaoAddress,
    setLanguage: actions.setLanguage,
    loadLog: actions.load
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
