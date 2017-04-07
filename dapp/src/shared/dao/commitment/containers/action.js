import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'setPercentage':
      title = 'titleSetPercentage'
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
