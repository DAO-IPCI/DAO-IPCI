import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { loadModule, changeData, changeFactor } from '../../../modules/chile/actions';
import { loadModule as docsLoadModule } from '../../../modules/docs/actions';
import { Main } from '../components/chile'

class MainContainer extends Component {
  componentWillMount() {
    if (!this.props.isLoad) {
      this.props.onLoad();
    }
  }

  componentWillReceiveProps(next) {
    if (!_.has(this.props.docs, 'address') && _.has(next.docs, 'address') && _.isEmpty(this.props.docsModules)) {
      this.props.onDocsLoadModule(next.docs.address)
    }
  }

  render() {
    return <Main {...this.props} />
  }
}

function mapStateToProps(state) {
  let docs = {}
  if (_.has(state.dao, 'blocks') && !_.isEmpty(state.dao.blocks)) {
    const block = _.find(state.dao.blocks, { type: 'docs' });
    if (block && !_.isEmpty(block.modules)) {
      docs = block.modules[1];
    }
  }
  const docsModules = state.docs.modules
  const filesData = []
  const filesFactor = []
  if (!_.isEmpty(docsModules)) {
    const mod = _.find(docsModules, { address: docs.address })
    if (!_.isEmpty(mod.docs)) {
      _.forEach(mod.docs, (item) => {
        const d = item.doc.match(/(Qm\w+)$/ig)
        if (d) {
          const nameData = item.txId.match(/data/ig)
          if (nameData) {
            filesData.push({
              hash: d[0],
              name: item.txId,
            })
          }
          const nameFactor = item.txId.match(/factor/ig)
          if (nameFactor) {
            filesFactor.push({
              hash: d[0],
              name: item.txId,
            })
          }
        }
      });
    }
  }

  const module = _.find(state.tokenAcl.modules, ['address', state.chile.token])
  let emission = 0
  if (!_.isEmpty(module) && state.chile.result.tco2 > 0) {
    emission = Math.floor((state.chile.result.tco2) * module.decimals) / module.decimals
  }
  return {
    ...state.chile,
    tokenAddress: state.chile.token,
    emission,
    docs,
    docsModules,
    filesData,
    filesFactor,
    token: { ...module }
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(
    { loadModule, changeData, changeFactor, docsLoadModule }, dispatch)
  return {
    onLoad: actions.loadModule,
    onDocsLoadModule: actions.docsLoadModule,
    onChangeData: event => actions.changeData(event.target.value),
    onChangeFactor: event => actions.changeFactor(event.target.value)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
