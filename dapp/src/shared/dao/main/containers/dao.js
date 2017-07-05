import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Dao } from '../components';
import Spin from '../../../../shared/components/common/spin'
import { load, removeModule } from '../../../../modules/dao/actions';

const Container = (props) => {
  if (_.isEmpty(props.address)) {
    return <p>не выбрано dao</p>
  }
  if (props.isLoad) {
    return <Dao {...props} />
  }
  return <Spin />
}

function mapStateToProps(state, props) {
  const { dao } = state
  const role = props.role
  let modules = []
  if (role === 'issuer') {
    modules = ['token', 'token-acl', 'holder', 'market', 'docs']
  } else if (role === 'auditor') {
    modules = ['auditor', 'commitment', 'token', 'token-acl', 'holder', 'docs']
  } else if (role === 'complier') {
    modules = ['complier', 'token', 'token-acl', 'market', 'docs']
  } else if (role === 'user') {
    modules = ['token', 'token-acl', 'market', 'docs']
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
    isLoad: dao.load === false
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
