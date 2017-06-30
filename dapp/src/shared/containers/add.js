import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Form from '../components/app/add';
import { setDaoAddress } from '../../modules/app/actions';

const validate = (values) => {
  const errors = {};
  if (!values.address) {
    errors.address = 'required'
  }
  return errors
}

function mapStateToProps() {
  return {
    fields: [
      {
        name: 'address'
      }
    ],
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(form => setDaoAddress(form.address), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'StartForm',
  validate,
})(Form))
