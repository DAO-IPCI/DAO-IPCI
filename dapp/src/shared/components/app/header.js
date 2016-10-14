import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Header = function Header(props) {
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link to="/" className="navbar-brand">{props.title}</Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Пользователь <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/operator">Оператор</Link></li>
                <li><Link to="/issuer">Эмитент</Link></li>
                <li><Link to="/auditor">Аудитор</Link></li>
                <li><Link to="/complier">Потребитель</Link></li>
              </ul>
            </li>
            <li><Link to="/log">лог</Link></li>
          </ul>
          <p className="navbar-text navbar-right">
            Core: {props.dao_address ?
              <small>{props.dao_address}</small>
              :
              <Link to="/">указать</Link>
            }
          </p>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
