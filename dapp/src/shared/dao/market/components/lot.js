import React, { PropTypes } from 'react'
import { translate } from 'react-i18next'

const Lot = (props) => {
  const { address, t } = props

  let buttons
  if (!props.my) {
    if (props.approve_sale_quantity < props.sale_quantity_full) {
      buttons = <span className="label label-danger">{t('notApprove')}</span>
    } else if (props.approve_buy_quantity < props.buy_quantity_full) {
      buttons = <button className="btn btn-success" onClick={props.approveLotBuy}>{t('approve')}</button>
    } else {
      buttons = <button className="btn btn-success" onClick={props.dealLot}>{t('buyLot')}</button>
    }
  } else {
    buttons = (<div className="btn-group">
      <button className="btn btn-warning" onClick={props.removeLot}>{t('removeLot')}</button>
      {props.approve_sale_quantity < props.sale_quantity_full &&
        <button className="btn btn-success" onClick={props.approveLotSale}>{t('approve')}</button>
      }
    </div>)
  }

  return (<div className="panel panel-default">
    <div className="panel-heading">
      {t('lot')}: <span className="label label-primary">{address}</span>
    </div>
    <div className="panel-body">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group" style={{ marginBottom: 0 }}>
            <li className="list-group-item active">{t('sale')}</li>
            <li className="list-group-item">
              {props.sale_name}
              <small className="pull-right"><span className="label label-success">{props.sale_address}</span></small>
            </li>
            <li className="list-group-item">
              {props.sale_quantity} {props.saleSymbol}
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="list-group" style={{ marginBottom: 0 }}>
            <li className="list-group-item active">{t('buy')}</li>
            <li className="list-group-item">
              {props.buy_name}
              <small className="pull-right"><span className="label label-success">{props.buy_address}</span></small>
            </li>
            <li className="list-group-item">
              {props.buy_quantity} {props.buySymbol}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="panel-footer text-right">
      {buttons}
    </div>
  </div>)
}

Lot.propTypes = {
  sale_name: PropTypes.string.isRequired,
  sale_address: PropTypes.string.isRequired,
  buy_name: PropTypes.string.isRequired,
  buy_address: PropTypes.string.isRequired,
  approve_sale_quantity: PropTypes.number.isRequired,
  approve_buy_quantity: PropTypes.number.isRequired,
  my: PropTypes.bool.isRequired,
  approveLotSale: PropTypes.func.isRequired,
  approveLotBuy: PropTypes.func.isRequired,
  removeLot: PropTypes.func.isRequired,
  dealLot: PropTypes.func.isRequired
}

export default translate(['market'])(Lot)
