import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/commitment/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'setPercentage') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('commitment:formPercentage'),
          validation: 'uint'
        }
      ]
    }
  } else if (props.action === 'emission') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('commitment:formAmount'),
          validation: 'uint'
        }
      ]
    }
  } else if (props.action === 'transfer') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('commitment:formAmount'),
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
  form: 'FormCommitment',
  validate,
})(Form))
