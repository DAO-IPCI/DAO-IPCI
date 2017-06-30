import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { submit } from '../../../../modules/token/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'transfer' || props.action === 'approve') {
    const fields = [
      {
        name: 'address',
        type: 'autocomplete',
        label: i18next.t('token:formAddress'),
        placeholder: '0x111111111111111',
        value: (_.has(props.query, 'address')) ? props.query.address : '',
        validation: 'address'
      },
      {
        name: 'value',
        label: i18next.t('token:formAmount'),
        placeholder: '1',
        value: (_.has(props.query, 'value')) ? props.query.value : '',
        validation: 'uint'
      },
      {
        name: 'isIpfs'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
    }
  } else if (props.action === 'emission') {
    return {
      fields: [
        {
          name: 'value',
          label: i18next.t('token:formAmount'),
          placeholder: '10',
          validation: 'uint'
        },
        {
          name: 'isIpfs'
        }
      ]
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
  form: 'FormToken',
  validate,
})(Form))
