/* eslint jsx-a11y/no-static-element-interactions: 0 */
import React from 'react'
import { Link } from 'react-router'

const Block = (props) => {
  const { name, type, modules, role } = props

  return (<div className="panel panel-default">
    <div className="panel-heading">
      {name}
      {(role === 'operator') &&
        <div className="btn-group pull-right" style={{ marginBottom: 10 }}>
          <Link to={'/dao/create/' + type} className="btn btn-info btn-xs"><span className="glyphicon glyphicon-plus" /></Link>
          <Link to={'/dao/link/' + type} className="btn btn-info btn-xs"><span className="glyphicon glyphicon-link" /></Link>
        </div>
      }
    </div>
    <div className="panel-body">
      <div className="list-group" style={{ marginBottom: 0 }}>
        {modules.map((item, index) =>
          <div key={index} className="list-group-item">
            <div className="btn-group pull-right">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                Action <span className="caret" />
              </button>
              <ul className="dropdown-menu">
                <li><Link to={'/dao/' + type + '/' + item.address}>Открыть</Link></li>
              </ul>
            </div>
            <Link to={'/dao/' + type + '/' + item.address}>
              {item.name}
            </Link><br />
            <small>{item.address}</small>
          </div>
        )}
      </div>
    </div>
  </div>)
}

export default Block
