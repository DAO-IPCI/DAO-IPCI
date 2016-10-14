import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'
import Form from '../containers/formFunc'

const Main = (props) => {
  const { address, name, totalSupply, balance } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/token/transfer/' + address} className="btn btn-default">Отправить</Link>
    <Link to={'/dao/token/approve/' + address} className="btn btn-default">Апрув</Link>
    <Link to={'/dao/token/emission/' + address} className="btn btn-default">Эмиссия</Link>
  </div>)
  return (<Layout title={'Token ' + name} address={address} menu={menu}>
    <p><b>Всего токенов</b>: {totalSupply}</p>
    <p><b>Мой баланс</b>: {balance}</p>
    <div className="panel panel-default">
      <div className="panel-heading">Balance</div>
      <div className="panel-body">
        <Form address={address} action="balanceOf" />
      </div>
    </div>
  </Layout>)
}

export default Main
