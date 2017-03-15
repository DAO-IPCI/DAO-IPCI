import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';
import { Main } from '../components/main';
import Spin from '../../../shared/components/common/spin'
import { load } from '../../../modules/txs/actions';

class MainContainer extends Component {
  componentWillMount() {
    if (!this.props.isLoad) {
      this.props.onLoad();
    }
  }

  render() {
    let content
    if (this.props.isLoad) {
      content = <Spin />
    } else {
      content = <Main {...this.props} />
    }
    return content
  }
}

function mapStateToProps(state) {
  const items = _.slice(_.orderBy(state.txs.items, 'timestamp', 'desc'), 0, 50);
  const isLoad = state.txs.isLoad
  return {
    items,
    isLoad
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ load }, dispatch)
  return {
    onLoad: actions.load
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
