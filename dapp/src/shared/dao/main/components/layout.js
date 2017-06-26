/* eslint react/prefer-stateless-function: 0*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

class Layout extends Component {
  render() {
    const { children, title, address, menu, hideBack, t } = this.props
    return (<div>
      <div className="row">
        <div className="col-md-4">
          <h3 style={{ marginTop: 5, marginBottom: 0 }}>{title}</h3>
          <span className="label label-success">{address}</span>
        </div>
        <div className="col-md-8 text-right" style={{ paddingTop: 12 }}>
          {menu}
          {!hideBack &&
            <div className="btn-group" style={{ marginBottom: 10 }}>
              <button onClick={this.context.router.goBack} className="btn btn-default">{t('back')}</button>
            </div>
          }
        </div>
      </div>
      <hr style={{ marginTop: 0 }} />
      {children}
    </div>)
  }
}

Layout.contextTypes = {
  router: PropTypes.object
}
Layout.defaultProps = {
  hideBack: true
};

export default translate()(Layout)
