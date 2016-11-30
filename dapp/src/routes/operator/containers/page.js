import React from 'react'
import { connect } from 'react-redux'
import i18next from 'i18next'
import Layout from '../../../shared/components/common/layout'

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
  const menu = [
    {
      name: i18next.t('createDao'),
      href: '/dao/create/core'
    }
  ];
  // if (!_.isEmpty(state.dao.blocks)) {
  //   menu.push({
  //     name: 'Создать рынок',
  //     href: '/dao/create/market'
  //   })
  //   const block = _.find(state.dao.blocks, ['type', 'acl'])
  //   const aclAddress = block.modules[0].address;
  //   menu.push({
  //     name: 'Хранилище ACL',
  //     href: '/dao/acl/' + aclAddress
  //   })
  // }
  return {
    title: i18next.t('operator'),
    menu
  }
}

export default connect(mapStateToProps)(Container)
