import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { burnBalance } from '../../modules/app/actions';
import Form from '../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'payment') {
    return {
      fields: ['value'],
      selects: {},
      labels: [i18next.t('commission:formAmount')],
      placeholders: ['1'],
      initialValues: props
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => burnBalance(props.address, props.action, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormLock'
}, mapStateToProps, mapDispatchToProps)(Form)
