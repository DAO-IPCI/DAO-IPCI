import React from 'react'

const Item = (props) => {
  const { message } = props

  return (<div>
    {message}
    <hr />
  </div>)
}

export default Item
