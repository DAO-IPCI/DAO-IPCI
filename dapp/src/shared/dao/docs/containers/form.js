import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/docs/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'append') {
    return {
      fields: ['tx', 'doc'],
      labels: [i18next.t('docs:formTx'), i18next.t('docs:formDoc')],
      initialValues: {
        doc: props.doc
      },
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
  form: 'FormDocs'
}, mapStateToProps, mapDispatchToProps)(Form)
