import React from 'react'
import { Layout } from '../../main/components'
import Form from '../containers/form'

const Action = (props) => {
  const { title, address, action } = props
  return (<Layout title={title} address={address} hideBack={false}>
    <Form address={address} action={action} />
  </Layout>)
}

export default Action
