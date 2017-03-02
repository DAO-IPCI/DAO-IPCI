import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Modules from '../../../shared/dao'

const Container = (props) => {
  const { address, module, action, query, param } = props
  const Module = Modules[module + 'Action']
  return (<Module address={address} action={action} query={query} param={param} />)
}

function mapStateToProps(store, props) {
  return {
    module: _.camelCase(props.params.module),
    address: props.params.address,
    action: _.camelCase(props.params.action),
    query: props.location.query,
    param: props.params.param
  }
}

export default connect(mapStateToProps)(Container)
