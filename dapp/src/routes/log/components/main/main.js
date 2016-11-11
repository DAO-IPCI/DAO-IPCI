import React from 'react'
import Item from './item'

const Main = (props) => {
  const { items, onClear } = props

  return (<div>
    <div className="text-right" style={{ marginTop: -63, marginBottom: 31 }}>
      <button className="btn btn-warning" onClick={onClear}>Очистить</button>
    </div>
    {items.map((item, index) => <Item key={index} message={item} />)}
  </div>)
}

export default Main
