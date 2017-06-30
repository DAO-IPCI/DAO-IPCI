import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { submit } from '../../../../modules/docs/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'append') {
    const fields = [
      {
        name: 'tx',
        label: i18next.t('docs:formTx'),
        value: props.param,
        validation: 'required'
      },
      {
        name: 'doc',
        label: i18next.t('docs:formDoc'),
        validation: 'required'
      },
      {
        type: 'hidden',
        name: 'hash'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
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
  form: 'FormDocs',
  validate,
})(Form))
