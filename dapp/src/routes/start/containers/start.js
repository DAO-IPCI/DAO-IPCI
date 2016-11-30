import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { Form } from '../components/start';
import { setDaoAddress } from '../../../modules/app/actions';

export const fields = ['address']

const validate = (values) => {
  const errors = {};
  if (!values.address) {
    errors.address = 'required'
  }
  return errors
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(form => setDaoAddress(form.address), dispatch)
  }
}

export default reduxForm({
  form: 'StartForm',
  fields,
  validate
}, null, mapDispatchToProps)(Form)
