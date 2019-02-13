import React from 'react'
import { connect } from 'react-redux'
import i18next from 'i18next'
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

function mapStateToProps(state, props) {
  const path = props.routes[3].path
  let title
  if (path === 'drone') {
    title = i18next.t('Drone case')
  } else {
    title = i18next.t('Chile case')
  }
  return {
    title,
    menu: []
  }
}

export default connect(mapStateToProps)(Container)
