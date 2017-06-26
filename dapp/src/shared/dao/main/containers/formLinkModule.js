import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { submitLinkModule } from '../../../../modules/dao/actions';
import Form from '../../../../shared/components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  const fields = [
    {
      name: 'type',
      type: 'select',
      label: i18next.t('dao:formLinkType'),
      value: props.module,
      options: [
        {
          name: i18next.t('dao:formLinkTokenAcl'),
          value: 'token-acl'
        },
        {
          name: i18next.t('dao:formLinkHolder'),
          value: 'holder'
        },
        {
          name: i18next.t('dao:formLinkAuditor'),
          value: 'auditor'
        },
        {
          name: i18next.t('dao:formLinkCommitment'),
          value: 'commitment'
        },
        {
          name: i18next.t('dao:formLinkComplier'),
          value: 'complier'
        },
        {
          name: i18next.t('dao:formLinkAcl'),
          value: 'acl'
        },
        {
          name: i18next.t('dao:formLinkToken'),
          value: 'token'
        },
        {
          name: i18next.t('dao:formLinkMarket'),
          value: 'market'
        },
        {
          name: i18next.t('dao:formLinkDocs'),
          value: 'docs'
        },
        {
          name: i18next.t('dao:formLinkAgents'),
          value: 'agents'
        }
      ],
      validation: 'required'
    },
    {
      name: 'name',
      label: i18next.t('dao:formLinkName'),
      validation: 'required'
    },
    {
      name: 'address',
      type: 'autocomplete',
      label: i18next.t('dao:formLinkAddress'),
      value: props.address,
      validation: 'address'
    }
  ]
  return {
    fields,
    initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submitLinkModule(props.daoAddress, form), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormLinkModule',
  validate,
})(Form))
