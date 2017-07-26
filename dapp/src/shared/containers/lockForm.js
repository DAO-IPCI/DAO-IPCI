import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { burnBalance } from '../../modules/app/actions';
import Form from '../components/common/form';
import { validate } from '../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'payment') {
    const fields = [
      {
        name: 'value',
        label: i18next.t('commission:formAmount'),
        value: (_.has(props, 'value')) ? props.value : '',
        validation: 'uint'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value')),
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => burnBalance(props.address, props.action, form), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormLock',
  validate,
})(Form))
