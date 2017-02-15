
import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Upload from './upload'
import { Layout } from '../../main/components'
import Form from '../containers/form'

class Action extends Component {
  state = { doc: '' }

  onUpload(doc) {
    this.setState({ doc })
  }
  render() {
    const { title, address, action, t } = this.props
    return (<Layout title={t(title)} address={address} hideBack={false}>
      <Upload onUpload={doc => this.onUpload(doc)} />
      <Form address={address} doc={this.state.doc} action={action} />
    </Layout>)
  }
}

export default translate(['docs'])(Action)
