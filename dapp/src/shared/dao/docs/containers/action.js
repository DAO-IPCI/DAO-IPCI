import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'append':
      title = 'titleAppend'
      break
    default:
      title = '';
  }
  return {
    title,
    address: props.address,
    action: props.action,
    param: props.param
  }
}

export default connect(mapStateToProps)(Action)
