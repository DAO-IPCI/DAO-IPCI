import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Form from '../containers/formFunc'

const Main = (props) => {
  const { address, token, holdDuration, balance, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/holder/set-hold-duration/' + address} className="btn btn-default">{t('menuSetHoldDuration')}</Link>
    <Link to={'/dao/holder/withdraw/' + address} className="btn btn-default">{t('menuWithdraw')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu}>
    <p><b>{t('token')}</b>: <Link to={'/dao/token-acl/' + token}>{token}</Link> ({balance})</p>
    <p><b>{t('holdDuration')}</b>: {holdDuration} {t('holdDurationUnit')}</p>
    <div className="panel panel-default">
      <div className="panel-heading">Record</div>
      <div className="panel-body">
        <Form address={address} action="record" />
      </div>
    </div>
  </Layout>)
}

export default translate(['holder'])(Main)
