import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
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
    title: 'Complier',
    menu: [
      {
        name: 'Cоздать контракт потребителя',
        href: '/dao/create/complier'
      }
    ]
  }
}

export default connect(mapStateToProps)(Container)
