import React from 'react'
import Item from './item'

const Main = (props) => {
  const { items, onLoad } = props

  return (<div>
    <div className="text-right" style={{ marginTop: -63, marginBottom: 31 }}>
      <button className="btn btn-warning" onClick={onLoad}>Обновить</button>
    </div>
    {items.map((item, index) => <Item key={index} {...item} />)}
  </div>)
}

export default Main
