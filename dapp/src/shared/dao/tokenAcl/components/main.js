import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Form from '../containers/formFunc'

const timeConverter = (timestamp) => {
  const a = new Date(timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

const Main = (props) => {
  const { address, name, totalSupply, balance, aclGroup, timestamp, period, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/token-acl/emission/' + address} className="btn btn-default">{t('emission')}</Link>
    <Link to={'/dao/token-acl/transfer/' + address} className="btn btn-default">{t('menuSend')}</Link>
    <Link to={'/dao/token-acl/approve/' + address} className="btn btn-default">{t('menuApprove')}</Link>
    <Link to={'/dao/token-acl/set-period/' + address} className="btn btn-default">{t('menuSetPeriod')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix') + ' ' + name} address={address} menu={menu}>
    <p><b>{t('allTokens')}</b>: {totalSupply}</p>
    <p><b>{t('myBalance')}</b>: {balance}</p>
    <p><b>{t('groupAuditors')}</b>: {aclGroup}</p>
    <p><b>{t('endDate')}</b>: {(timestamp > 0) ? timeConverter(timestamp) : '-'}</p>
    <p><b>{t('period')}</b>: {(period > 0) ? (period / 60 / 24) + ' day' : '-'}</p>
    <div className="panel panel-default">
      <div className="panel-heading">{t('Balance')}</div>
      <div className="panel-body">
        <Form address={address} action="balanceOf" />
      </div>
    </div>
  </Layout>)
}

export default translate(['tokenAcl'])(Main)
