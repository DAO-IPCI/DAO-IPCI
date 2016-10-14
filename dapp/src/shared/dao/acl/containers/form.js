import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/acl/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'createGroup' || props.action === 'addMember') {
    return {
      fields: ['group', 'address'],
      selects: {},
      labels: ['Название группы', 'Адрес участника'],
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
