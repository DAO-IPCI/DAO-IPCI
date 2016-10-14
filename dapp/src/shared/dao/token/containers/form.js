import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/token/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'transfer' || props.action === 'approve') {
    return {
      fields: ['address', 'value'],
      selects: {},
      labels: ['Адрес', 'Кол-во токенов'],
      placeholders: ['0x111111111111111', '1'],
      autocomplete: {
        address: true
      }
    }
  } else if (props.action === 'emission') {
    return {
      fields: ['value'],
      selects: {},
      labels: ['Кол-во токенов'],
      placeholders: ['10']
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
  form: 'FormToken'
}, mapStateToProps, mapDispatchToProps)(Form)
