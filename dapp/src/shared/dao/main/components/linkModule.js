import React from 'react'
import { Layout } from './index'
import FormLinkModule from '../containers/formLinkModule'

const LinkModule = (props) => {
  const { title, daoAddress, module, address } = props
  return (<Layout title={title} hideBack={false}>
    <FormLinkModule daoAddress={daoAddress} module={module} address={address} />
  </Layout>)
}

export default LinkModule
