import React from 'react'
import Item from './item'

const Main = (props) => {
  const { items } = props

  return (<div>
    {items.map((item, index) => <Item key={index} message={item} />)}
  </div>)
}

export default Main
