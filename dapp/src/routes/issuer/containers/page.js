import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import i18next from 'i18next'
import Layout from '../../../shared/components/common/layout'

class Container extends Component {
  componentWillMount() {
    this.checkDao(this.props.dao_address)
  }
  componentWillReceiveProps(nextProps) {
    this.checkDao(nextProps.dao_address)
  }
  checkDao(address) {
    if (_.isEmpty(address)) {
      this.context.router.push('/')
    }
  }
  render() {
    const { title, menu, children } = this.props

    return (<Layout
      title={title}
      menu={menu}
    >
      {children}
    </Layout>)
  }
}

Container.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    dao_address: state.app.dao_address,
    title: i18next.t('issuer'),
    menu: [
      {
        name: i18next.t('createCarbonRegistry'),
        href: '/dao/create/issuer'
      }
    ]
  }
}

export default connect(mapStateToProps)(Container)
