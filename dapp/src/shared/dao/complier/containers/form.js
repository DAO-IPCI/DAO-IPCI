import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/complier/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'burn') {
    return {
      fields: ['token', 'value', 'isIpfs'],
      labels: [i18next.t('auditor:formAddress'), i18next.t('complier:formAmount')],
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
