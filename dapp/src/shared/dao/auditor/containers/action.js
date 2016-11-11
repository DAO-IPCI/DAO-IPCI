import { connect } from 'react-redux'
import { Action } from '../components';

function mapStateToProps(store, props) {
  let title
  switch (props.action) {
    case 'setEmissionLimit':
      title = 'Абсолютный предел количества токенов, эмиссируемых Аудитором'
      break
    case 'setHoldPercentage':
      title = 'Размер страхового взноса в процентах'
      break
    case 'emission':
      title = 'Эмиссия'
      break
    case 'transfer':
      title = 'Перевод эмитенту'
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
