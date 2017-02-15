/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React, { Component } from 'react'
import { translate } from 'react-i18next'
import _ from 'lodash'
import Form from '../containers/formSearch'
import styles from './style.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: (_.isEmpty(props.fields.sale) && _.isEmpty(props.fields.buy))
    };
  }
  handleSubmit() {
    this.setState({ isHide: !this.state.isHide });
  }
  render() {
    const hide = this.state.isHide ? 'hidden' : ''
    const hideIcon = this.state.isHide ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'
    return (
      <div className="panel panel-default">
        <div className={'panel-heading ' + styles.search} onClick={() => this.handleSubmit()}>
          {this.props.t('search')} <span className={'glyphicon ' + hideIcon} />
        </div>
        <div className={'panel-body ' + hide}>
          <Form />
        </div>
      </div>
    )
  }
}

export default translate(['market'])(Search)
