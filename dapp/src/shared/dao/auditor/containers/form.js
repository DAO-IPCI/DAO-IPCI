import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/auditor/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'setEmissionLimit') {
    return {
      fields: [
        {
          name: 'limit',
          label: i18next.t('auditor:formLimit'),
          validation: 'uint'
        },
        {
          name: 'isIpfs'
        }
      ]
    }
  } else if (props.action === 'setHoldPercentage') {
    return {
      fields: [
        {
          name: 'hold',
          label: i18next.t('auditor:formPercentage'),
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
          label: i18next.t('auditor:formAmount'),
          validation: 'uint'
        },
        {
          name: 'isIpfs'
        }
      ]
    }
  } else if (props.action === 'transfer') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('auditor:formAmount'),
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
  form: 'FormAuditor',
  validate,
})(Form))
