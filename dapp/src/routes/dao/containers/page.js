import React from 'react'
import { connect } from 'react-redux'
import Layout from '../../../shared/components/common/layout'

const Container = (props) => {
  const { title, menu, children, back } = props

  return (<Layout
    title={title}
    menu={menu}
    back={back}
  >
    {children}
  </Layout>)
}

function mapStateToProps() {
  const back = '/operator'
  return {
    title: 'DAO',
    menu: [],
    back
  }
}

export default connect(mapStateToProps)(Container)
