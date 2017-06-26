import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/acl/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'createGroup' || props.action === 'addMember') {
    return {
      fields: [
        {
          name: 'group',
          label: i18next.t('acl:formName'),
          placeholder: 'Group',
          validation: 'required'
        },
        {
          name: 'address',
          type: 'autocomplete',
          label: i18next.t('acl:formAddress'),
          placeholder: '0x111111111111111',
          validation: 'address'
        },
        {
          name: 'isIpfs'
        }
      ]
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(props.address, props.action, form), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormAcl',
  validate,
})(Form))
