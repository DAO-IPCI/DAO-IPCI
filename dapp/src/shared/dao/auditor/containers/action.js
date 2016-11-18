import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'setEmissionLimit':
      title = 'titleSetEmissionLimit'
      break
    case 'setHoldPercentage':
      title = 'titleSetHoldPercentage'
      break
    case 'emission':
      title = 'titleEmission'
      break
    case 'transfer':
      title = 'titleTransfer'
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
