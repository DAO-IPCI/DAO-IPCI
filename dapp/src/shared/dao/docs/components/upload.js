import React, { Component } from 'react'
import { translate } from 'react-i18next'
import Dropzone from 'react-dropzone'
// import IPFS from 'ipfs'
// import hett from 'hett'
import getIpfs from '../../../../utils/ipfs'
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
    getIpfs().then((r) => {
      ipfs = r
      this.setState({
        ready: true
      })
    })
    // const coinbase = hett.web3h.coinbase()
    // const config = {
    //   repo: 'ipfs-2-' + coinbase,
    //   config: {
    //     Addresses: {
    //       Swarm: [
    //         '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
    //       ]
    //     },
    //   }
    // }
    // ipfs = new Ipfs(config)
    // ipfs.on('ready', () => {
    //   console.log('Online status: ', ipfs.isOnline() ? 'online' : 'offline')
    //   this.setState({
    //     ready: true
    //   })
    // })
    // ipfs = new Ipfs({
    //   init: false,
    //   start: false,
    //   repo: 'ipfs-' + coinbase
    // })
    // ipfs.on('ready', () => {
    //   ipfs.start(() => {
    //     console.log('Online status: ', ipfs.isOnline() ? 'online' : 'offline')
    //     this.setState({
    //       ready: true
    //     })
    //   })
    // })
    // ipfs._repo.exists((e, status) => { /* eslint no-underscore-dangle: 0 */
    //   if (status === false) {
    //     ipfs.init((err) => {
    //       if (err) {
    //         throw err
    //       }
    //       ipfs.start(() => {
    //         console.log('Online status: ', ipfs.isOnline() ? 'online' : 'offline')
    //         this.setState({
    //           ready: true
    //         })
    //       })
    //     })
    //   }
    // })
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
      return null
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
