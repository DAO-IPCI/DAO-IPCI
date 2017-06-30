import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { submitCreateModule } from '../../../../modules/dao/actions';
import Form from '../../../../shared/components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.module === 'core') {
    return {
      fields: [
        {
          name: 'dao_name',
          label: i18next.t('dao:formCoreDaoName'),
          validation: 'required'
        },
        {
          name: 'dao_description',
          label: i18next.t('dao:formCoreDaoDescription'),
          validation: 'required'
        },
        {
          name: 'operator_nam',
          label: i18next.t('dao:formCoreOperatorName'),
          validation: 'uint'
        }
      ]
    }
  } else if (props.module === 'issuer') {
    const fields = [
      {
        name: 'name',
        label: i18next.t('dao:formRegistryName'),
        validation: 'required'
      },
      {
        name: 'symbol',
        label: i18next.t('dao:formRegistrySymbol'),
        validation: 'required'
      },
      {
        name: 'decimalc',
        label: i18next.t('dao:formRegistryDecimals'),
        value: 3,
        validation: 'uint'
      },
      {
        name: 'operator_core',
        label: i18next.t('dao:formIssuerOperatorCore'),
        value: state.dao.address,
        disableds: true,
        validation: 'address'
      },
      {
        name: 'group',
        label: i18next.t('dao:formIssuerGroup'),
        validation: 'required'
      },
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
    }
  } else if (props.module === 'auditor' || props.module === 'commitment') {
    const operatorAddress = state.dao.owner;
    const fields = [
      {
        name: 'operator',
        label: i18next.t('dao:formAuditorOperator'),
        value: operatorAddress,
        disabled: !_.isEmpty(operatorAddress),
        validation: 'address'
      },
      {
        name: 'token',
        type: 'autocomplete',
        label: i18next.t('dao:formAuditorToken'),
        validation: 'address'
      },
      {
        name: 'holder',
        type: 'autocomplete',
        label: i18next.t('dao:formAuditorHolder'),
        validation: 'address'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
    }
  } else if (props.module === 'holder') {
    const operatorAddress = state.dao.owner;
    const fields = [
      {
        name: 'operator',
        label: i18next.t('dao:formHolderOperator'),
        value: operatorAddress,
        disabled: !_.isEmpty(operatorAddress),
        validation: 'address'
      },
      {
        name: 'token',
        type: 'autocomplete',
        label: i18next.t('dao:formHolderToken'),
        validation: 'address'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
    }
  } else if (props.module === 'complier') {
    return {
      fields: []
    }
  } else if (props.module === 'market') {
    return {
      fields: []
    }
  } else if (props.module === 'token') {
    return {
      fields: [
        {
          name: 'name',
          label: i18next.t('dao:formTokenName'),
          placeholder: i18next.t('dao:formTokenName'),
          validation: 'required'
        },
        {
          name: 'symbol',
          label: i18next.t('dao:formTokenSymbol'),
          placeholder: 'S',
          validation: 'required'
        },
        {
          name: 'decimals',
          label: i18next.t('dao:formTokenDecimals'),
          placeholder: 0,
          validation: 'uint'
        },
        {
          name: 'start_count',
          label: i18next.t('dao:formTokenStartCount'),
          placeholder: 0,
          validation: 'uint'
        }
      ]
    }
  } else if (props.module === 'tokenAcl') {
    const operatorAddress = state.dao.owner;
    const fields = [
      {
        name: 'name',
        label: i18next.t('dao:formTokenAclName'),
        placeholder: i18next.t('dao:formTokenAclName'),
        validation: 'required'
      },
      {
        name: 'symbol',
        label: i18next.t('dao:formTokenAclSymbol'),
        placeholder: 'S',
        validation: 'required'
      },
      {
        name: 'decimals',
        label: i18next.t('dao:formTokenAclDecimals'),
        placeholder: 0,
        validation: 'uint'
      },
      {
        name: 'start_count',
        label: i18next.t('dao:formTokenAclStartCount'),
        placeholder: 0,
        validation: 'uint'
      },
      {
        name: 'acl',
        type: 'autocomplete',
        label: i18next.t('dao:formTokenAclAcl'),
        placeholder: '0x111111111',
        validation: 'address'
      },
      {
        name: 'acl_group',
        label: i18next.t('dao:formTokenAclAclGroup'),
        placeholder: 'name',
        validation: 'required'
      },
      {
        name: 'operator',
        type: 'autocomplete',
        label: i18next.t('dao:formTokenAclAclOperator'),
        placeholder: '0x111111111',
        value: operatorAddress,
        disabled: !_.isEmpty(operatorAddress),
        validation: 'address'
      },
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
    }
  } else if (props.module === 'acl' || props.module === 'docs') {
    return {
      fields: [],
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submitCreateModule(form, props.module), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormCreator',
  validate,
})(Form))
