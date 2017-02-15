import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Doc from './doc'

const Main = (props) => {
  const { address, name, docs, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/docs/append/' + address} className="btn btn-default">{t('menuAppend')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix') + ' ' + name} address={address} menu={menu}>
    {docs.map((doc, index) => <Doc key={index} {...doc} />)}
  </Layout>)
}

export default translate(['docs'])(Main)
