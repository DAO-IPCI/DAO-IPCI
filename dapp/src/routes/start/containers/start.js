import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { loadModule } from '../../../modules/tokenAcl/actions';
import { Slider, Roles } from '../components/start';
import Spin from '../../../shared/components/common/spin'

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { role: 'operator' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    _.forEach(this.props.tokens, (item) => {
      if (item.load) {
        this.props.onLoad(item.address);
      }
    });
  }

  componentWillReceiveProps(next) {
    if (!_.isEqual(this.props.tokens, next.tokens)) {
      _.forEach(next.tokens, (item) => {
        if (item.load) {
          this.props.onLoad(item.address);
        }
      });
    }
  }

  handleChange(event) {
    this.setState({ role: event.target.value });
  }

  handleSubmit(event) {
    this.context.router.push('/' + this.state.role)
    event.preventDefault();
  }

  render() {
    let slider;
    if (this.props.load) {
      slider = <Spin />
    } else if (this.props.tokens.length <= 0) {
      slider = <div>-</div>
    } else {
      slider = <Slider tokens={this.props.tokens} market={this.props.market} />
    }
    return (
      <div>
        <h1>
          Decentralized application for "Integral Platform for Climate Initiatives" (DApp IPCI)
        </h1>
        <h2>Meet our projects</h2>
        {slider}
        <h2>Go to advanced interace</h2>
        <Roles
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          role={this.state.role}
        />
      </div>
    )
  }
}

Container.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const tokens = [];
  let load = false;
  let count = 0;
  let market = '';
  if (!state.dao.load) {
    const markets = _.find(state.dao.blocks, { type: 'market' });
    if (_.has(markets, 'modules') && markets.modules.length > 0) {
      market = markets.modules[0].address;
    }
    const block = _.find(state.dao.blocks, { type: 'token-acl' });
    if (_.has(block, 'modules')) {
      load = true;
      _.forEach(block.modules, (item) => {
        const token = {
          address: item.address,
          name: item.name,
          load: true,
          info: {}
        };
        const info = _.find(state.tokenAcl.modules, { address: item.address });
        if (info) {
          token.info = info;
          token.load = false;
          count += 1;
        }
        tokens.push(token);
      });
    }
  }
  if (tokens.length === count) {
    load = false;
  }
  if (state.dao.load) {
    load = true;
  }
  return {
    tokens,
    market,
    load
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onLoad: bindActionCreators(address => loadModule(address), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
