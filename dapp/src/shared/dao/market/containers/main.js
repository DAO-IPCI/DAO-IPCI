import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Main } from '../components'
import Spin from '../../../../shared/components/common/spin'
import { loadModule, approveLot, dealLot, removeLot } from '../../../../modules/market/actions';

class Container extends Component {
  componentWillMount() {
    this.props.loadModule(this.props.address)
  }
  render() {
    if (this.props.isModule) {
      return <Main {...this.props} />
    }
    return <Spin />
  }
}

function mapStateToProps(store, props) {
  const module = _.find(store.market.modules, ['address', props.address])
  return {
    ...module,
    address: props.address,
    isModule: !_.isEmpty(module)
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    loadModule, approveLot, dealLot, removeLot
  }, dispatch)
  return {
    loadModule: actions.loadModule,
    approveLot: (lot, token, value) => actions.approveLot(props.address, lot, token, value),
    dealLot: address => actions.dealLot(props.address, address),
    removeLot: address => actions.removeLot(props.address, address),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
