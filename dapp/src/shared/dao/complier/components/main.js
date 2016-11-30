import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'

const Main = (props) => {
  const { address, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/complier/burn/' + address} className="btn btn-default">{t('menuBurn')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu} />)
}

export default translate(['complier'])(Main)
