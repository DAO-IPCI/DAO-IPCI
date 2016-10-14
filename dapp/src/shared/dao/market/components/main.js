import React from 'react'
import { Link } from 'react-router'
import { Layout } from '../../main/components'
import Lot from './lot'

const Main = (props) => {
  const { address, lots, approveLot, dealLot, removeLot } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/market/lot/' + address} className="btn btn-default">Добавить лот</Link>
  </div>)
  return (<Layout title={'Market'} address={address} menu={menu}>
    {lots.map((item, index) => (
      <Lot
        key={index}
        {...item}
        approveLotSale={() => approveLot(item.address, item.sale_address, item.sale_quantity)}
        approveLotBuy={() => approveLot(item.address, item.buy_address, item.buy_quantity)}
        dealLot={() => dealLot(item.address)}
        removeLot={() => removeLot(item.address)}
      />
    ))}
  </Layout>)
}

export default Main
