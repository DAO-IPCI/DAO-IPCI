import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/complier/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'burn') {
    return {
      fields: [
        {
          name: 'token',
          type: 'autocomplete',
          label: i18next.t('complier:formAddress'),
          validation: 'address'
        },
        {
          name: 'value',
          label: i18next.t('complier:formAmount'),
          validation: 'uint'
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
  form: 'FormComplier',
  validate,
})(Form))
