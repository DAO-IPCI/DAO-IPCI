import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'

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
                {props.t('user')} <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/operator">{props.t('operator')}</Link></li>
                <li><Link to="/issuer">{props.t('issuer')}</Link></li>
                <li><Link to="/auditor">{props.t('auditor')}</Link></li>
                <li><Link to="/complier">{props.t('complier')}</Link></li>
                <li><Link to="/user">{props.t('user')}</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                {props.t('lng')} <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li><button className="btn btn-link" onClick={() => props.setLanguage('en')}>en</button></li>
                <li><button className="btn btn-link" onClick={() => props.setLanguage('ru')}>ru</button></li>
              </ul>
            </li>
            <li><Link to="/log">{props.t('log')}</Link></li>
            <li><Link to="/txs">{props.t('txs')}</Link></li>
          </ul>
          <p className="navbar-text navbar-right">
            Core: {props.dao_address ?
              <small>{props.dao_address}</small>
              :
              <Link to="/">{props.t('selectDao')}</Link>
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

export default translate()(Header)
