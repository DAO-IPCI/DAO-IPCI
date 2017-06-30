import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import i18next from 'i18next'
import { call } from '../../../../modules/token/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'balanceOf') {
    const module = _.find(state.token.modules, ['address', props.address])
    const funcs = (!_.isEmpty(module) && _.has(module, 'funcs')) ? module.funcs : {}
    let input = {}
    let output = ''
    if (_.has(funcs, props.action)) {
      input = funcs[props.action].input
      output = funcs[props.action].output
    }
    const fields = [
      {
        name: 'address',
        type: 'autocomplete',
        label: i18next.t('token:formAddress'),
        value: (_.has(input, 'address')) ? input.address : '',
        validation: 'address'
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
  form: 'FormTokenFunc',
  validate,
})(Form))
