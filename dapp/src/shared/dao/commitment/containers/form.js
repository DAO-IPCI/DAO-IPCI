import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/commitment/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'setPercentage') {
    return {
      fields: ['value'],
      labels: [i18next.t('commitment:formPercentage')]
    }
  } else if (props.action === 'emission') {
    return {
      fields: ['value'],
      labels: [i18next.t('commitment:formAmount')]
    }
  } else if (props.action === 'transfer') {
    return {
      fields: ['value'],
      labels: [i18next.t('commitment:formAmount')]
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
  form: 'FormCommitment'
}, mapStateToProps, mapDispatchToProps)(Form)
