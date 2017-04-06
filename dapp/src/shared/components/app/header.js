import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next'
import Add from '../../containers/add'

const Header = function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand navbar-link" to="/">
              <img src="assets/img/ipci-logo.svg" className="inline-mid" role="presentation" />
              <span className="inline-mid"><strong>DAO</strong> IPCI</span>
            </Link>
            <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="">
                  <strong>IPCI</strong><span className="caret" />
                </a>
                <ul className="dropdown-menu" role="menu">
                  {props.programms.map((item, index) =>
                    <li key={index} className={(item.address === props.dao_address) ? 'disabled' : ''} role="presentation">
                      <button onClick={() => props.setDaoAddress(item.address)}>{item.name}</button>
                    </li>
                  )}
                  <li role="separator" className="divider">
                    <span style={{ display: 'none' }} />
                  </li>
                  <li role="presentation">
                    <a href="" data-toggle="modal" data-target="#about">
                      <strong>Add new program</strong>
                      <i className="fa fa-magic inline-mid m-l-10" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <p className="text-uppercase navbar-text" id="navbar-program-text" />
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="">
                  {props.t('language')} <span className="caret" />
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li className={(props.language === 'en') ? 'disabled' : ''} role="presentation"><button onClick={() => props.setLanguage('en')}>English</button></li>
                  <li className={(props.language === 'ru') ? 'disabled' : ''} role="presentation"><button onClick={() => props.setLanguage('ru')}>Русский</button></li>
                </ul>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" href="">
                  {props.t('user')} <span className="caret" />
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li className={(props.role === 'operator') ? 'disabled' : ''} role="presentation"><Link to="/operator">{props.t('operator')}</Link></li>
                  <li className={(props.role === 'issuer') ? 'disabled' : ''} role="presentation"><Link to="/issuer">{props.t('issuer')}</Link></li>
                  <li className={(props.role === 'auditor') ? 'disabled' : ''} role="presentation"><Link to="/auditor">{props.t('auditor')}</Link></li>
                  <li className={(props.role === 'complier') ? 'disabled' : ''} role="presentation"><Link to="/complier">{props.t('complier')}</Link></li>
                  <li className={(props.role === 'user') ? 'disabled' : ''} role="presentation"><Link to="/user">{props.t('user')}</Link></li>
                </ul>
              </li>
              <li role="presentation"><Link to="/txs">{props.t('txs')}</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="about" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div id="modal-about">
              <div className="modal-header">
                <button className="close" data-dismiss="modal"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title">You are watching program 'IPCI' </h4>
              </div>
              <div className="modal-body">
                {props.dao_address &&
                  <div>
                    <p><strong>Programs leger Ethereum smart contract address: </strong></p>
                    <p>{props.dao_address}</p>
                    <hr />
                  </div>
                }
                <p><strong>Add new program:</strong></p>
                <Add />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default translate()(Header)
