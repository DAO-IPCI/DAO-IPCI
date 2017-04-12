import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'

const Main = (props) => {
  const {
    address,
    tokenEmission,
    token,
    holder,
    balanceContact,
    limit,
    percentage,
    balanceTokenEmission,
    t
  } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/commitment/set-percentage/' + address} className="btn btn-default">{t('menuSetPercentage')}</Link>
    <Link to={{ pathname: '/dao/token/transfer/' + token, query: { address } }} className="btn btn-default">{t('menuSend')}</Link>
    {limit > 0 ?
      <Link to={'/dao/commitment/emission/' + address} className="btn btn-default">{t('menuEmission')}</Link>
      :
      <button className="btn btn-default" disabled>{t('menuEmission')}</button>
    }
    <Link to={'/dao/commitment/transfer/' + address} className="btn btn-default">{t('menuTransfer')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu}>
    <p><b>{t('tokenEmission')}</b>: <Link to={'/dao/token-acl/' + tokenEmission}>{tokenEmission}</Link> ({balanceTokenEmission})</p>
    <p><b>{t('token')}</b>: <Link to={'/dao/token/' + token}>{token}</Link> ({balanceContact})</p>
    <p><b>{t('holder')}</b>: <Link to={'/dao/holder/' + holder}>{holder}</Link></p>
    <p><b>{t('limit')}</b>: {limit}</p>
    <p><b>{t('percentage')}</b>: {percentage}</p>
  </Layout>)
}

export default translate(['commitment'])(Main)
