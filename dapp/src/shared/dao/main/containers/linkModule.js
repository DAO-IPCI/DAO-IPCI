import { connect } from 'react-redux'
import LinkModule from '../components/linkModule';

function mapStateToProps(store, props) {
  return {
    title: 'titleLinkModule',
    daoAddress: props.daoAddress,
    module: props.module,
    address: props.address
  }
}

export default connect(mapStateToProps)(LinkModule)
