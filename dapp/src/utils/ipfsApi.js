import IpfsApi from 'ipfs-api'
import { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL } from '../config/config'

let ipfs = null
export default () => (
  new Promise((resolve) => {
    if (ipfs === null) {
      ipfs = new IpfsApi(IPFS_HOST, IPFS_PORT, { protocol: IPFS_PROTOCOL })
      resolve(ipfs)
    } else {
      resolve(ipfs)
    }
  })
)
