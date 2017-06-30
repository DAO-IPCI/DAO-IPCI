import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/tokenAcl/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'transfer' || props.action === 'approve') {
    return {
      fields: [
        {
          name: 'address',
          type: 'autocomplete',
          label: i18next.t('tokenAcl:formAddress'),
          placeholder: '0x111111111111111',
          validation: 'address'
        },
        {
          name: 'value',
          label: i18next.t('tokenAcl:formAmount'),
          placeholder: '1',
          validation: 'uint'
        },
        {
          name: 'isIpfs'
        }
      ]
    }
  } else if (props.action === 'emission') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('tokenAcl:formAmount'),
          placeholder: '10',
          validation: 'uint'
        },
        {
          name: 'isIpfs'
        }
      ]
    }
  } else if (props.action === 'setPeriod') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('tokenAcl:formSetPeriod'),
          placeholder: '10',
          validation: 'uint'
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
  form: 'FormTokenAcl',
  validate,
})(Form))
