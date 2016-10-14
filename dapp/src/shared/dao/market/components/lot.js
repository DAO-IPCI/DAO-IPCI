import React, { PropTypes } from 'react'

const Lot = (props) => {
  const { address } = props

  let buttons
  if (!props.my) {
    if (props.approve_sale_quantity < props.sale_quantity) {
      buttons = <span className="label label-danger">не для продажи, продавец не дал доступ</span>
    } else if (props.approve_buy_quantity < props.buy_quantity) {
      buttons = <button className="btn btn-success" onClick={props.approveLotBuy}>Дать доступ</button>
    } else {
      buttons = <button className="btn btn-success" onClick={props.dealLot}>Купить</button>
    }
  } else {
    buttons = (<div className="btn-group">
      <button className="btn btn-warning" onClick={props.removeLot}>Снять лот</button>
      {props.approve_sale_quantity < props.sale_quantity &&
        <button className="btn btn-success" onClick={props.approveLotSale}>Дать доступ</button>
      }
    </div>)
  }

  return (<div className="panel panel-default">
    <div className="panel-heading">
      Лот: <span className="label label-primary">{address}</span>
    </div>
    <div className="panel-body">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group" style={{ marginBottom: 0 }}>
            <li className="list-group-item active">Продается</li>
            <li className="list-group-item">{props.sale_name}</li>
            <li className="list-group-item"><span className="label label-primary">{props.sale_address}</span></li>
            <li className="list-group-item">{props.sale_quantity}</li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="list-group" style={{ marginBottom: 0 }}>
            <li className="list-group-item active">За</li>
            <li className="list-group-item">{props.buy_name}</li>
            <li className="list-group-item"><span className="label label-primary">{props.buy_address}</span></li>
            <li className="list-group-item">{props.buy_quantity}</li>
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
  sale_quantity: PropTypes.number.isRequired,
  buy_name: PropTypes.string.isRequired,
  buy_address: PropTypes.string.isRequired,
  buy_quantity: PropTypes.number.isRequired,
  approve_sale_quantity: PropTypes.number.isRequired,
  approve_buy_quantity: PropTypes.number.isRequired,
  my: PropTypes.bool.isRequired,
  approveLotSale: PropTypes.func.isRequired,
  approveLotBuy: PropTypes.func.isRequired,
  removeLot: PropTypes.func.isRequired,
  dealLot: PropTypes.func.isRequired
}

export default Lot
