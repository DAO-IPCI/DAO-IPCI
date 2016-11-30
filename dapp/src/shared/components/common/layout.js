import React, { PropTypes } from 'react'
import Title from './title'

const Layout = (props) => {
  const { title, menu, back, children } = props

  return (<div>
    <Title
      title={title}
      menu={menu}
      back={back}
    />
    <div>
      {children}
    </div>
  </div>)
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.array,
  back: PropTypes.string
}

export default Layout
