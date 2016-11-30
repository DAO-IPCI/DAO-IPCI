import React from 'react'
import { translate } from 'react-i18next'
import { Layout } from './index'
import FormCreateModule from '../containers/formCreateModule'

const CreateModule = (props) => {
  const { title, module, t } = props
  return (<Layout title={t(title)} hideBack={false}>
    <FormCreateModule module={module} />
  </Layout>)
}

export default translate(['dao'])(CreateModule)
