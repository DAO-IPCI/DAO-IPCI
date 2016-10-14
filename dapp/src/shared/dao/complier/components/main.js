import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'

const Main = (props) => {
  const { address } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/complier/burn/' + address} className="btn btn-default">Сжечь</Link>
  </div>)
  return (<Layout title={'Complier'} address={address} menu={menu} />)
}

export default Main
