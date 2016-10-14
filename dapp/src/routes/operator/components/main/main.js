import React from 'react'
import { Dao } from '../../../../shared/dao'

const Main = props => (
  (<div>
    <Dao address={props.dao_address} role={props.role} />
  </div>)
)

export default Main
