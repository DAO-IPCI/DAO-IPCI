import React from 'react'
import { Link } from 'react-router'

const Slider = (props) => {
  const {
    tokens,
    market
  } = props

  return (
    <div className="carousel slide" data-ride="carousel" id="carousel-1">
      <div className="carousel-inner" role="listbox">
        {tokens.map((item, index) => {
          if (item.load) {
            return (
              <div key={index} className={index === 0 ? 'item active' : 'item'}>
                load...
              </div>
            )
          }
          return (
            <div key={index} className={index === 0 ? 'item active' : 'item'}>
              <img src="assets/img/project-bambous-01.jpg" alt="Solar Park in Mauritus" />
              <div className="carousel-caption">
                <h3>{item.name}</h3>
                <p>Quantity: {item.info.totalSupply}</p>
                <Link className="btn btn-primary" role="button" data-bs-hover-animate="pulse" to={'/dao/market/' + market}>Buy units</Link>
              </div>
            </div>
          )
        })}
      </div>
      <div className="carousel-controls">
        <a className="left carousel-control" href="#carousel-1" role="button" data-slide="prev">
          <i className="glyphicon glyphicon-chevron-left" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#carousel-1" role="button" data-slide="next">
          <i className="glyphicon glyphicon-chevron-right" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      <ol className="carousel-indicators">
        {tokens.map((item, index) =>
          <li key={index} data-target="#carousel-1" data-slide-to={index} className={index === 0 ? 'active' : ''} />
        )}
      </ol>
    </div>
  )
}

export default Slider
