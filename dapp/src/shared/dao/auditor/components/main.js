import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'

const Main = (props) => {
  const { address, token, holder, value, limit, percentage, balance, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/auditor/set-emission-limit/' + address} className="btn btn-default">{t('menuSetEmissionLimit')}</Link>
    <Link to={'/dao/auditor/set-hold-percentage/' + address} className="btn btn-default">{t('menuSetHoldPercentage')}</Link>
    <Link to={'/dao/auditor/emission/' + address} className="btn btn-default">{t('menuEmission')}</Link>
    <Link to={'/dao/auditor/transfer/' + address} className="btn btn-default">{t('menuTransfer')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu}>
    <p><b>{t('token')}</b>: <Link to={'/dao/token-acl/' + token}>{token}</Link> ({balance})</p>
    <p><b>{t('holder')}</b>: <Link to={'/dao/holder/' + holder}>{holder}</Link></p>
    <p><b>{t('value')}</b>: {value}</p>
    <p><b>{t('limit')}</b>: {limit}</p>
    <p><b>{t('percentage')}</b>: {percentage}</p>
  </Layout>)
}

export default translate(['auditor'])(Main)
