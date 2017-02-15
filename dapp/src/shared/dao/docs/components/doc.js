import React from 'react'
import { translate } from 'react-i18next'

const Doc = (props) => {
  const { txId, doc, owner } = props

  return (<div>
    {txId} {doc} {owner}
  </div>)
}

export default translate(['docs'])(Doc)
