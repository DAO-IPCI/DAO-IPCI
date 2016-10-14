import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'transfer':
      title = 'Отправить'
      break
    case 'approve':
      title = 'Апрув'
      break
    case 'emission':
      title = 'Эмиссия'
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
