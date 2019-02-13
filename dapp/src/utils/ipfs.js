// import IPFS from 'ipfs'
// import Promise from 'bluebird'
// import hett from 'hett'
import getIpfs from './ipfsApi'

export default getIpfs

// let ipfs = null
// export default () => (
//   new Promise((resolve) => {
//     if (ipfs === null) {
//       // const coinbase = web3.eth.accounts[0]
//       // console.log(coinbase);
//       const coinbase = hett.web3h.coinbase()
//       const config = {
//         repo: 'ipfs-2-' + coinbase,
//         config: {
//           Addresses: {
//             Swarm: [
//               '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
//             ]
//           },
//         }
//       }
//       ipfs = new Ipfs(config)
//       ipfs.on('ready', () => {
//         resolve(ipfs)
//       })
//     } else {
//       resolve(ipfs)
//     }
//   })
// )
