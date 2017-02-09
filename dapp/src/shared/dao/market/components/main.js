import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import { Layout } from '../../main/components'
import Lot from './lot'

const Main = (props) => {
  const { address, lots, commissionToken, commission,
    role, approveLot, dealLot, removeLot, t } = props
  const menu = (<div className="btn-group" style={{ marginBottom: 10 }}>
    <Link to={'/dao/market/lot/' + address} className="btn btn-default">{t('menuAddLot')}</Link>
    {role === 'operator' &&
      <Link to={'/dao/market/set-commission-token/' + address} className="btn btn-default">{t('menuSetCommissionToken')}</Link>
    }
    {role === 'operator' &&
      <Link to={'/dao/market/set-commission/' + address} className="btn btn-default">{t('menuSetCommission')}</Link>
    }
  </div>)
  return (<Layout title={t('titlePrefix')} address={address} menu={menu}>
    <p><b>{t('commission')}</b>: {commissionToken} ({commission}%)</p>
    {lots.map((item, index) => (
      <Lot
        key={index}
        {...item}
        approveLotSale={() => approveLot(item.address, item.sale_address, item.sale_quantity_full)}
        approveLotBuy={() => approveLot(item.address, item.buy_address, item.buy_quantity_full)}
        dealLot={() => dealLot(item.address)}
        removeLot={() => removeLot(item.address)}
      />
    ))}
  </Layout>)
}

export default translate(['market'])(Main)
