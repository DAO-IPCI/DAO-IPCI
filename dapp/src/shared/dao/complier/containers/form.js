import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/complier/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'burn') {
    return {
      fields: ['token', 'value'],
      labels: ['Адрес токена', 'Кол-во'],
      autocomplete: {
        token: true
      }
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
  form: 'FormComplier'
}, mapStateToProps, mapDispatchToProps)(Form)
