import IpfsApi from 'ipfs-api'
import { IPFS_HOST, IPFS_PORT, IPFS_PROTOCOL } from '../config/config'

let ipfsApi = null;
export function pin(hash, cb) {
  if (ipfsApi === null) {
    try {
      ipfsApi = new IpfsApi(IPFS_HOST, IPFS_PORT, { protocol: IPFS_PROTOCOL })
    } catch (e) {
      console.log(e);
    }
  }
  ipfsApi.pin.add(hash, cb)
}
// {
//   if (err || !res) {
//     console.error(err)
//     return false;
//   }
//   return true;
// }
