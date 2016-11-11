import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submitCreateModule } from '../../../../modules/dao/actions';
import Form from '../../../../shared/components/common/form';

function mapStateToProps(state, props) {
  if (props.module === 'core') {
    // return {
    //   fields: ['name', 'description'],
    //   selects: {},
    //   labels: ['Название DAO', 'Описание DAO'],
    //   placeholders: ['My DAO', 'description']
    // }
    return {
      fields: ['dao_name', 'dao_description', 'operator_nam'],
      labels: ['Имя автономии', 'Описание автономии', 'Имя оператора']
    }
  } else if (props.module === 'issuer') {
    return {
      fields: ['name', 'operator_core', 'group'],
      labels: ['Название', 'Адрес DAO', 'Название группы аудиторов'],
      initialValues: { operator_core: state.dao.address },
      disableds: [false, true, false]
    }
  } else if (props.module === 'auditor') {
    return {
      fields: ['operator', 'token', 'holder'],
      labels: ['Адрес оператора', 'Адрес углеродного реестра', 'Адрес страхового контракта'],
      autocomplete: {
        token: true,
        holder: true
      }
    }
  } else if (props.module === 'complier') {
    return {
      fields: [],
      labels: []
    }
  } else if (props.module === 'market') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  } else if (props.module === 'token') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма'],
      placeholders: ['Название', 'S', 0, 0]
    }
  } else if (props.module === 'tokenAcl') {
    return {
      fields: ['name', 'symbol', 'decimals', 'start_count', 'acl', 'acl_group'],
      selects: {},
      labels: ['Название', 'Символ', 'Кол-во знаков', 'Начальная сумма', 'Адрес ACL', 'Название группы ACL'],
      placeholders: ['Название', 'S', 0, 0, '0x111111111', 'name'],
      autocomplete: {
        acl: true
      }
    }
  } else if (props.module === 'acl') {
    return {
      fields: [],
      selects: {},
      labels: [],
      placeholders: []
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submitCreateModule(form, props.module), dispatch)
  }
}
export default reduxForm({
  form: 'FormCreator'
}, mapStateToProps, mapDispatchToProps)(Form)
