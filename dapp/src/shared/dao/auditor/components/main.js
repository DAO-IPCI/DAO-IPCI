import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'

const Main = (props) => {
  const { address, token, holder, value, limit, percentage, balance } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/auditor/set-emission-limit/' + address} className="btn btn-default">Установить лимит</Link>
    <Link to={'/dao/auditor/set-hold-percentage/' + address} className="btn btn-default">Установить размер страхового взноса</Link>
    <Link to={'/dao/auditor/emission/' + address} className="btn btn-default">Эмиссия</Link>
    <Link to={'/dao/auditor/transfer/' + address} className="btn btn-default">Перевод эмитенту</Link>
  </div>)
  return (<Layout title={'Аудитор'} address={address} menu={menu}>
    <p><b>Токен</b>: <Link to={'/dao/token-acl/' + token}>{token}</Link> ({balance})</p>
    <p><b>Страховка</b>: <Link to={'/dao/holder/' + holder}>{holder}</Link></p>
    <p><b>Кол-во проэмиссированого</b>: {value}</p>
    <p><b>Лимит количества токенов</b>: {limit}</p>
    <p><b>Процент страхового взноса</b>: {percentage}</p>
  </Layout>)
}

export default Main
