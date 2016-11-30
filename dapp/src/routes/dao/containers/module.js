import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Modules from '../../../shared/dao'

const Container = (props) => {
  const { address, module } = props
  const Module = Modules[module]
  return (<Module address={address} />)
}

function mapStateToProps(store, props) {
  return {
    module: _.camelCase(props.params.module),
    address: props.params.address
  }
}

export default connect(mapStateToProps)(Container)
