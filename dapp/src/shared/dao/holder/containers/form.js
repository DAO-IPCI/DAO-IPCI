import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/holder/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'setHoldDuration') {
    return {
      fields: ['duration_sec', 'isIpfs'],
      labels: [i18next.t('holder:formDuration')]
    }
  } else if (props.action === 'withdraw') {
    return {
      fields: ['index', 'isIpfs'],
      labels: [i18next.t('holder:formIndexRecord')]
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
