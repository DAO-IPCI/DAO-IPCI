import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/acl/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'createGroup' || props.action === 'addMember') {
    return {
      fields: ['group', 'address'],
      selects: {},
      labels: [i18next.t('acl:formName'), i18next.t('acl:formAddress')],
      placeholders: ['Group', '0x111111111111111'],
      autocomplete: {
        address: true
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
  form: 'FormAcl'
}, mapStateToProps, mapDispatchToProps)(Form)
