import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/auditor/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'setEmissionLimit') {
    return {
      fields: ['limit'],
      labels: ['Лимит']
    }
  } else if (props.action === 'setHoldPercentage') {
    return {
      fields: ['hold'],
      labels: ['Процент']
    }
  } else if (props.action === 'emission') {
    return {
      fields: ['value'],
      labels: ['Кол-во']
    }
  } else if (props.action === 'transfer') {
    return {
      fields: ['value'],
      labels: ['Кол-во']
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
