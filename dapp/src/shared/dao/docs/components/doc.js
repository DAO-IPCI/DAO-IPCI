import React from 'react'
import { translate } from 'react-i18next'

const Doc = (props) => {
  const { txId, doc, owner, t } = props

  return (<div className="list-group-item">
    <h4 className="list-group-item-heading">{txId}</h4>
    <p className="list-group-item-text">
      {t('Doc')}: {doc}<br />
      <small>{t('Owner')}: {owner}</small>
    </p>
  </div>)
}

export default translate(['docs'])(Doc)
