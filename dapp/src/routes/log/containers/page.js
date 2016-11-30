import React from 'react'
import { connect } from 'react-redux'

import Layout from '../../../shared/components/common/layout';

const Container = (props) => {
  const { title, menu, children } = props

  return (<Layout
    title={title}
    menu={menu}
  >
    {children}
  </Layout>)
}

function mapStateToProps() {
  return {
    title: 'Лог',
    menu: []
  }
}

export default connect(mapStateToProps)(Container)
