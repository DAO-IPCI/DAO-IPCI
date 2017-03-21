import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Dropzone from 'react-dropzone'
import Ipfs from 'ipfs-api'
import { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL } from '../../../../config/config'
import styles from './style.css'

const ipfs = new Ipfs(IPFS_HOST, IPFS_PORT, { protocol: IPFS_PROTOCOL })

class Upload extends Component {
  state = { doc: false }

  onDrop(acceptedFiles) {
    const reader = new window.FileReader()
    reader.onload = () => {
      let data = reader.result
      data = new Buffer(data.substr(data.indexOf(',') + 1), 'base64')
      ipfs.add(data, (err, res) => {
        if (err || !res) {
          console.error(err)
          return false;
        }
        // console.log(res);
        const url = 'https://ipfs.io/ipfs/' + res[0].hash;
        this.setState({ doc: url })
        this.props.onUpload(url)
        return true;
      })
    }
    reader.readAsDataURL(acceptedFiles[0])
  }
  render() {
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
