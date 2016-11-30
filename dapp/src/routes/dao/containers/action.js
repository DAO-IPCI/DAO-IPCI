import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Modules from '../../../shared/dao'

const Container = (props) => {
  const { address, module, action } = props
  const Module = Modules[module + 'Action']
  return (<Module address={address} action={action} />)
}

function mapStateToProps(store, props) {
  return {
    module: _.camelCase(props.params.module),
    address: props.params.address,
    action: _.camelCase(props.params.action)
  }
}

export default connect(mapStateToProps)(Container)
