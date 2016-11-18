import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'setHoldDuration':
      title = 'titleSetHoldDuration'
      break
    case 'withdraw':
      title = 'titleWithdraw'
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
