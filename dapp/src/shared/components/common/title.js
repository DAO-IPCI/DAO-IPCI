import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import _ from 'lodash'
import { translate } from 'react-i18next'

const Title = (props) => {
  const { title, menu, back } = props

  return (<div>
    <div className="row">
      <div className="col-md-8">
        <h1>{title}</h1>
      </div>
      <div className="col-md-4" style={{ paddingTop: 25 }}>
        {!_.isEmpty(back) &&
          <Link to={back} className="btn btn-default pull-right">DAO</Link>
        }
        {!_.isEmpty(menu) &&
          <ul className="nav nav-pills pull-right">
            <li role="presentation" className="dropdown">
              <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {props.t('menu')} <span className="caret" />
              </a>
              <ul className="dropdown-menu dropdown-menu-right">
                {menu.map((item, index) =>
                  <li key={index}><Link to={item.href}>{item.name}</Link></li>)}
              </ul>
            </li>
          </ul>
        }
      </div>
    </div>
    <hr style={{ marginTop: 0 }} />
  </div>)
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.array,
  back: PropTypes.string
}

Title.defaultProps = {
  menu: [],
  back: ''
}

export default translate()(Title)
