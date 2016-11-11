import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'
import Form from '../containers/formFunc'

const Main = (props) => {
  const { address, name, totalSupply, balance, aclGroup } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/token-acl/transfer/' + address} className="btn btn-default">Отправить</Link>
    <Link to={'/dao/token-acl/approve/' + address} className="btn btn-default">Апрув</Link>
    <Link to={'/dao/token-acl/emission/' + address} className="btn btn-default">Эмиссия</Link>
  </div>)
  return (<Layout title={'Углеродный реестр ' + name} address={address} menu={menu}>
    <p><b>Всего токенов</b>: {totalSupply}</p>
    <p><b>Мой баланс</b>: {balance}</p>
    <p><b>Группа аудиторов</b>: {aclGroup}</p>
    <div className="panel panel-default">
      <div className="panel-heading">Баланс</div>
      <div className="panel-body">
        <Form address={address} action="balanceOf" />
      </div>
    </div>
  </Layout>)
}

export default Main
