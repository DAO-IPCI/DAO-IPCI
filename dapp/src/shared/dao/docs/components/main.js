import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Doc from './doc'

const Main = (props) => {
  const { address, docs, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/docs/append/' + address} className="btn btn-default">{t('menuAppend')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu}>
    <div className="list-group">
      {docs.map((doc, index) => <Doc key={index} {...doc} />)}
    </div>
  </Layout>)
}

export default translate(['docs'])(Main)
