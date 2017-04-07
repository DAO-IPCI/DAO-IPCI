import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'transfer':
      title = 'titleSend'
      break
    case 'approve':
      title = 'titleApprove'
      break
    case 'emission':
      title = 'titleEmission'
      break
    default:
      title = '';
  }
  return {
    title,
    address: props.address,
    action: props.action,
    query: props.query
  }
}

export default connect(mapStateToProps)(Action)
