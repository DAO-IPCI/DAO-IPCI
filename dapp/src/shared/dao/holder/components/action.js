import React from 'react'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Form from '../containers/form'

const Action = (props) => {
  const { title, address, action, t } = props
  return (<Layout title={t(title)} address={address} hideBack={false}>
    <Form address={address} action={action} />
  </Layout>)
}

export default translate(['holder'])(Action)
