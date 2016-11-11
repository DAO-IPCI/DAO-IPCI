import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submitLinkModule } from '../../../../modules/dao/actions';
import Form from '../../../../shared/components/common/form';

function mapStateToProps(state, props) {
  return {
    fields: ['type', 'name', 'address'],
    selects: {
      type: [
        {
          name: 'Углеродный реестр',
          value: 'tokenAcl'
        },
        {
          name: 'Страховой случай',
          value: 'holder'
        },
        {
          name: 'Контракт аудитора',
          value: 'auditor'
        },
        {
          name: 'Контракт сomplier',
          value: 'complier'
        },
        {
          name: 'Группа аудиторов',
          value: 'acl'
        },
        {
          name: 'Токен',
          value: 'token'
        },
        {
          name: 'Рынок',
          value: 'market'
        }
      ]
    },
    initialValues: { type: props.module, address: props.address },
    labels: ['Тип модуля', 'Название', 'Адрес контракта'],
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
