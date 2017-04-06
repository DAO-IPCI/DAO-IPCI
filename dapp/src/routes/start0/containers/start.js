import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
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
function mapStateToProps(state) {
  const tokens = _.find(state.dao.blocks, { type: 'token-acl' });
  _.forEach(tokens.modules, (item) => {
    console.log(item);
  });
  return {}
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
}, mapStateToProps, mapDispatchToProps)(Form)
