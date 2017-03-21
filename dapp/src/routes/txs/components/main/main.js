import React from 'react'
import { translate } from 'react-i18next'
import Item from './item'

const Main = (props) => {
  const { items, onLoad, t } = props

  return (<div>
    <div className="text-right" style={{ marginTop: -63, marginBottom: 31 }}>
      <button className="btn btn-warning" onClick={onLoad}>{t('Update')}</button>
    </div>
    {items.map((item, index) => <Item key={index} {...item} />)}
  </div>)
}

export default translate(['common'])(Main)
