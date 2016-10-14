import React from 'react'
import { Layout } from './index'
import FormCreateModule from '../containers/formCreateModule'

const CreateModule = (props) => {
  const { title, module } = props
  return (<Layout title={title} hideBack={false}>
    <FormCreateModule module={module} />
  </Layout>)
}

export default CreateModule
