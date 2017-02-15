import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Ipfs from 'ipfs-api'

const ipfs = new Ipfs('localhost', 5001)

class Upload extends Component {
  state = { hash: false }

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
        this.setState({ hash: res[0].hash })
        this.props.onUpload(res[0].hash)
        return true;
      })
    }
    reader.readAsDataURL(acceptedFiles[0])
  }
  render() {
    return (<div>
      <div className="panel panel-default">
        <Dropzone className="panel-body" multiple={false} onDrop={files => this.onDrop(files)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>
      {this.state.hash !== false ? <div>
        <h2>http://ipfs.io/ipfs/{this.state.hash}</h2>
      </div> : null}
    </div>)
  }
}

export default Upload
