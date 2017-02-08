import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'lot':
      title = 'titleAddLot'
      break
    case 'setCommissionToken':
      title = 'titleSetCommissionToken'
      break
    case 'setCommission':
      title = 'titleSetCommission'
      break
    default:
      title = '';
  }
  return {
    title,
    address: props.address,
    action: props.action
  }
}

export default connect(mapStateToProps)(Action)
