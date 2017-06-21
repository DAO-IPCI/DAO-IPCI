import React from 'react'
import { connect } from 'react-redux'
import i18next from 'i18next'
import Form from './lockForm';
import { BILLING_ADDR } from '../../config/config'

const Lock = (props) => {
  let pay = null;
  if (props.myBalance >= props.commission) {
    pay = (
      <div className="panel panel-default">
        <div className="panel-heading">{i18next.t('commission:titlePay')}</div>
        <div className="panel-body">
          <p>{i18next.t('commission:balance')}: {props.myBalance} ETH</p>
          <Form address={BILLING_ADDR} action={'payment'} value={props.commission} />
        </div>
      </div>
    )
  } else {
    pay = <div className="text-center"><b>{i18next.t('commission:downBalance')}</b></div>
  }
  return (
    <div>
      <h1>{i18next.t('commission:title')} {props.commission} ETH</h1>
      {pay}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    commission: Math.abs(state.app.billingBalance),
    myBalance: state.app.myBalance
  }
}

export default connect(mapStateToProps)(Lock)
