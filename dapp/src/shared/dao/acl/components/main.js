import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'
import Group from './group'

const Main = (props) => {
  const { address, groups, onRemoveMember } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/acl/create-group/' + address} className="btn btn-default">Создать группу</Link>
    <Link to={'/dao/acl/add-member/' + address} className="btn btn-default">Добавить адрес</Link>
  </div>)
  return (<Layout title={'ACL'} address={address} menu={menu}>
    {groups.map((group, index) => <Group key={index} {...group} onRemoveMember={onRemoveMember} />)}
  </Layout>)
}

export default Main
