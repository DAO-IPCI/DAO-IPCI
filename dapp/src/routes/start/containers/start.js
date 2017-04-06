import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import i18next from 'i18next'
import _ from 'lodash'
import { loadModule } from '../../../modules/tokenAcl/actions';

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
      slider = <div>load...</div>
    } else if (this.props.tokens.length <= 0) {
      slider = <div>-</div>
    } else {
      slider = (
        <div className="carousel slide" data-ride="carousel" id="carousel-1">
          <div className="carousel-inner" role="listbox">
            {this.props.tokens.map((item, index) =>
              <div key={index} className={index === 0 ? 'item active' : 'item'}>
                {item.load ?
                  <div>load...</div>
                  :
                  <div>
                    <img src="assets/img/project-bambous-01.jpg" alt="Solar Park in Mauritus" />
                    <div className="carousel-caption">
                      <h3>{item.info.name}</h3>
                      <p>Quantity: {item.info.totalSupply}</p>
                      <Link className="btn btn-primary" role="button" data-bs-hover-animate="pulse" to={'/dao/market/' + this.props.market}>Buy units</Link>
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
          <div className="carousel-controls">
            <a className="left carousel-control" href="#carousel-1" role="button" data-slide="prev">
              <i className="glyphicon glyphicon-chevron-left" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#carousel-1" role="button" data-slide="next">
              <i className="glyphicon glyphicon-chevron-right" />
              <span className="sr-only">Next</span>
            </a>
          </div>
          <ol className="carousel-indicators">
            {this.props.tokens.map((item, index) =>
              <li key={index} data-target="#carousel-1" data-slide-to={index} className={index === 0 ? 'active' : ''} />
            )}
          </ol>
        </div>
      )
    }
    return (<div>
      <h1>Welcome to dApp IPCI</h1>
      <h2>Meet our projects</h2>
      {slider}
      <h2>Go to advanced interace</h2>
      <div className="col-md-4 col-md-offset-4 box">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <select className="form-control" required="" value={this.state.role} onChange={this.handleChange}>
              <optgroup label="Select type of interface">
                <option value="operator">{i18next.t('operator')}</option>
                <option value="issuer">{i18next.t('issuer')}</option>
                <option value="auditor">{i18next.t('auditor')}</option>
                <option value="complier">{i18next.t('complier')}</option>
                <option value="user">{i18next.t('user')}</option>
              </optgroup>
            </select>
          </div>
          <button className="btn btn-primary btn-block btn-lg" type="submit">Go</button>
        </form>
      </div>
    </div>)
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
