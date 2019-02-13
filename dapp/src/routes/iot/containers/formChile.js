import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { submit } from '../../../modules/chile/actions';
import Form from '../../../shared/components/common/form';
import { validate } from '../../../utils/helper';

function mapStateToProps(state, props) {
  let input = {}
  if (_.has(props, 'input')) {
    input = props.input
  }
  return {
    fields: [
      {
        name: 'value',
        label: i18next.t('tokenAcl:formAmount'),
        placeholder: '10',
        validation: 'uint',
        disabled: true
      },
    ],
    initialValues: input,
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(props.address, 'emission', form), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormTokenAcl',
  validate,
})(Form))
