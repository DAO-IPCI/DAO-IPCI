import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'createGroup':
      title = 'Создать группу'
      break
    case 'addMember':
      title = 'Добавить адрес'
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
