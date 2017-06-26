import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/holder/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'setHoldDuration') {
    return {
      fields: [
        {
          name: 'duration_sec',
          label: i18next.t('holder:formDuration'),
        },
        {
          name: 'isIpfs'
        }
      ]
    }
  } else if (props.action === 'withdraw') {
    return {
      fields: [
        {
          name: 'index',
          label: i18next.t('holder:formIndexRecord'),
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
  form: 'FormHolder',
  validate,
})(Form))
