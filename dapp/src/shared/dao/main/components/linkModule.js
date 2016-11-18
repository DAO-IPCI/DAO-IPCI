import React from 'react'
import { translate } from 'react-i18next'
import { Layout } from './index'
import FormLinkModule from '../containers/formLinkModule'

const LinkModule = (props) => {
  const { title, daoAddress, module, address, t } = props
  return (<Layout title={t(title)} hideBack={false}>
    <FormLinkModule daoAddress={daoAddress} module={module} address={address} />
  </Layout>)
}

export default translate(['dao'])(LinkModule)
