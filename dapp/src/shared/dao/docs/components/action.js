import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { change } from 'redux-form'
import _ from 'lodash'
import Upload from './upload'
import { Layout } from '../../main/components'
import Form from '../containers/form'

class Action extends Component {
  onUpload(hash) {
    let url = ''
    if (!_.isEmpty(hash)) {
      url = 'https://ipfs.io/ipfs/' + hash;
    }
    this.props.dispatch(change('FormDocs', 'doc', url));
    this.props.dispatch(change('FormDocs', 'hash', hash));
  }
  render() {
    const { title, address, param, action, t } = this.props
    return (<Layout title={t(title)} address={address} hideBack={false}>
      <Upload onUpload={hash => this.onUpload(hash)} />
      <Form address={address} action={action} param={param} />
    </Layout>)
  }
}

export default translate(['docs'])(Action)
