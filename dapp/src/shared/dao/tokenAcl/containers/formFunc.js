import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import _ from 'lodash'
import { call } from '../../../../modules/tokenAcl/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state, props) {
  if (props.action === 'balanceOf') {
    const module = _.find(state.tokenAcl.modules, ['address', props.address])
    const funcs = (!_.isEmpty(module) && _.has(module, 'funcs')) ? module.funcs : {}
    let input = {}
    let output = ''
    if (_.has(funcs, props.action)) {
      input = funcs[props.action].input
      output = funcs[props.action].output
    }
    return {
      fields: ['address'],
      labels: ['Адрес'],
      initialValues: input,
      output,
      autocomplete: {
        address: true
      }
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => call(props.address, props.action, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormTokenAclFunc'
}, mapStateToProps, mapDispatchToProps)(Form)
