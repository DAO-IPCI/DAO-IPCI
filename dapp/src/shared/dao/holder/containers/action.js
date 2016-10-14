import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'setHoldDuration':
      title = 'Время удержания страхового взноса в секундах'
      break
    case 'withdraw':
      title = 'Вывод средств'
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
