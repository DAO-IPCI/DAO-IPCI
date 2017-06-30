import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Dropzone from 'react-dropzone'
// import IPFS from 'ipfs'
import hett from 'hett'
import styles from './style.css'

let ipfs = null;

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      doc: false
    };
  }

  componentDidMount() {
    ipfs = new Ipfs({
      repo: String('ipfs_repo_' + hett.web3h.coinbase())
    })
    ipfs.on('ready', () => {
      console.log('IPFS node is ready')
      ipfs.id((err) => {
        if (err) {
          throw err
        }
        this.setState({
          ready: true
        })
      })
    })
  }

  onDrop(acceptedFiles) {
    const reader = new window.FileReader()
    reader.onload = () => {
      let data = reader.result
      data = new Buffer(data.substr(data.indexOf(',') + 1), 'base64')
      ipfs.files.add(data, (err, res) => {
        if (err || !res) {
          console.error(err)
          return false;
        }
        // console.log(res);
        const url = 'https://ipfs.io/ipfs/' + res[0].hash;
        this.setState({ doc: url })
        this.props.onUpload(res[0].hash)
        return true;
      })
    }
    reader.readAsDataURL(acceptedFiles[0])
  }

  render() {
    if (ipfs === null || this.state.ready === false) {
      return <div />
    }
    return (<div>
      <div className="panel panel-default">
        <Dropzone className={'panel-body ' + styles.dropzone} activeClassName={styles.dropzoneActive} multiple={false} onDrop={files => this.onDrop(files)}>
          <div>{this.props.t('dropzoneText')}</div>
        </Dropzone>
      </div>
      {this.state.doc !== false ? <div>
        <h2>{this.state.doc}</h2>
      </div> : null}
    </div>)
  }
}

export default translate(['docs'])(Upload)
