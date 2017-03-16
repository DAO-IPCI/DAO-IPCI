import React from 'react'

const timeConverter = (timestamp) => {
  const a = new Date(timestamp * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}

const Item = (props) => {
  const { txId, from, fromName, to, toName, input, ascii, timestamp } = props

  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <span className="label label-primary pull-right">{timeConverter(timestamp)}</span>
        <p>Contract: <b>{toName}</b> <span className="label label-info">{to}</span></p>
        <p>txId: <a href={'https://etherscan.io/tx/' + txId}>{txId}</a></p>
        <p>from: <b>{fromName}</b> <span className="label label-success">{from}</span></p>
        <ul className="nav nav-tabs">
          <li className="active"><a href={'#input' + txId} data-toggle="tab">Input</a></li>
          <li><a href={'#ascii' + txId} data-toggle="tab">Ascii</a></li>
        </ul>
        <div className="tab-content clearfix">
          <div className="tab-pane active" id={'input' + txId} style={{ overflow: 'auto' }}>
            <code>{input}</code>
          </div>
          <div className="tab-pane" id={'ascii' + txId} style={{ overflow: 'auto' }}>
            <code>{ascii}</code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
