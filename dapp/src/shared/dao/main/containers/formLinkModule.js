import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submitLinkModule } from '../../../../modules/dao/actions';
import Form from '../../../../shared/components/common/form';

function mapStateToProps(state, props) {
  return {
    fields: ['type', 'name', 'address'],
    selects: {
      type: [
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
        }
      ]
    },
    initialValues: { type: props.module, address: props.address },
    labels: [i18next.t('dao:formLinkType'), i18next.t('dao:formLinkName'), i18next.t('dao:formLinkAddress')],
    placeholders: []
  }
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submitLinkModule(props.daoAddress, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormLinkModule'
}, mapStateToProps, mapDispatchToProps)(Form)
