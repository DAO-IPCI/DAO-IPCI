import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import i18next from 'i18next'
import { call } from '../../../../modules/holder/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'record') {
    const module = _.find(state.holder.modules, ['address', props.address])
    const funcs = (!_.isEmpty(module) && _.has(module, 'funcs')) ? module.funcs : {}
    let input = {}
    let output = ''
    if (_.has(funcs, props.action)) {
      input = funcs[props.action].input
      output = funcs[props.action].output
    }
    const fields = [
      {
        name: 'index',
        label: i18next.t('holder:formIndex'),
        value: (_.has(input, 'index')) ? input.index : '',
        validation: 'uint'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value')),
      output
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => call(props.address, props.action, form), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormHolderFunc',
  validate,
})(Form))
