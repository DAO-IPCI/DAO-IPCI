import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { CreateModule } from '../../../shared/dao'

const Container = (props) => {
  const { module } = props
  return (<CreateModule module={module} />)
}

function mapStateToProps(store, props) {
  return {
    module: _.camelCase(props.params.module),
  }
}

export default connect(mapStateToProps)(Container)
