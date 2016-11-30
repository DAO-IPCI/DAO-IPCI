import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Group from './group'

const Main = (props) => {
  const { address, groups, onRemoveMember, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/acl/create-group/' + address} className="btn btn-default">{t('menuCreateGroup')}</Link>
    <Link to={'/dao/acl/add-member/' + address} className="btn btn-default">{t('menuAddMember')}</Link>
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu}>
    {groups.map((group, index) => <Group key={index} {...group} onRemoveMember={onRemoveMember} />)}
  </Layout>)
}

export default translate(['acl'])(Main)
