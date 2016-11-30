import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { LinkModule } from '../../../shared/dao'

const Container = (props) => {
  const { daoAddress, module, address } = props
  return (<LinkModule daoAddress={daoAddress} module={module} address={address} />)
}

function mapStateToProps(store, props) {
  return {
    module: _.camelCase(props.params.module),
    daoAddress: store.app.dao_address,
    address: props.params.address
  }
}

export default connect(mapStateToProps)(Container)
