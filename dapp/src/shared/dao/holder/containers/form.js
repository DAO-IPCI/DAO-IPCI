import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/holder/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'setHoldDuration') {
    return {
      fields: ['duration_sec'],
      labels: ['Продолжительность в сек.']
    }
  } else if (props.action === 'withdraw') {
    return {
      fields: ['index'],
      labels: ['Индекс записи']
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(props.address, props.action, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormHolder'
}, mapStateToProps, mapDispatchToProps)(Form)
