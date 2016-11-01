import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Dao } from '../components';
import Spin from '../../../../shared/components/common/spin'
import { load, removeModule } from '../../../../modules/dao/actions';

class Container extends Component {
  componentWillMount() {
    if (!_.isEmpty(this.props.address)) {
      this.props.load(this.props.address)
    }
  }
  render() {
    if (_.isEmpty(this.props.address)) {
      return <p>не выбрано dao</p>
    }
    if (this.props.isLoad) {
      return <Dao {...this.props} />
    }
    return <Spin />
  }
}

function mapStateToProps(state, props) {
  const { dao } = state
  const role = props.role
  let modules = []
  if (role === 'issuer') {
    modules = ['token', 'token-acl', 'holder', 'market']
  } else if (role === 'auditor') {
    modules = ['auditor', 'token', 'token-acl', 'holder']
  } else if (role === 'complier') {
    modules = ['complier', 'token', 'token-acl', 'market']
  }
  let blocks = dao.blocks
  if (!_.isEmpty(modules)) {
    blocks = _.filter(blocks, block => _.some(modules, i => i === block.type));
  }
  return {
    name: dao.name,
    address: props.address,
    role,
    blocks,
    isLoad: !_.isEmpty(dao.name)
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    load,
    removeModule
  }, dispatch)
  return {
    load: actions.load,
    onRemoveModule: name => actions.removeModule(props.address, name)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
