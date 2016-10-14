import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'
import Form from '../containers/formFunc'

const Main = (props) => {
  const { address, token, holdDuration, balance } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/holder/set-hold-duration/' + address} className="btn btn-default">Установить время удержания</Link>
    <Link to={'/dao/holder/withdraw/' + address} className="btn btn-default">Вывод средств</Link>
  </div>)
  return (<Layout title={'Holder'} address={address} menu={menu}>
    <p><b>Токен</b>: <Link to={'/dao/token-acl/' + token}>{token}</Link> ({balance})</p>
    <p><b>Время удержания</b>: {holdDuration} сек.</p>
    <div className="panel panel-default">
      <div className="panel-heading">Record</div>
      <div className="panel-body">
        <Form address={address} action="record" />
      </div>
    </div>
  </Layout>)
}

export default Main
