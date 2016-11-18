import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/auditor/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'setEmissionLimit') {
    return {
      fields: ['limit'],
      labels: [i18next.t('auditor:formLimit')]
    }
  } else if (props.action === 'setHoldPercentage') {
    return {
      fields: ['hold'],
      labels: [i18next.t('auditor:formPercentage')]
    }
  } else if (props.action === 'emission') {
    return {
      fields: ['value'],
      labels: [i18next.t('auditor:formAmount')]
    }
  } else if (props.action === 'transfer') {
    return {
      fields: ['value'],
      labels: [i18next.t('auditor:formAmount')]
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
  form: 'FormAuditor'
}, mapStateToProps, mapDispatchToProps)(Form)
