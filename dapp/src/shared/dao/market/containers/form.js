import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import { submit } from '../../../../modules/market/actions';
import Form from '../../../components/common/form';
import { coinbase } from '../../../../utils/web3'

function mapStateToProps(state, props) {
  if (props.action === 'lot') {
    return {
      fields: ['seller', 'sale', 'buy', 'quantity_sale', 'quantity_buy'],
      selects: {},
      labels: ['Адрес продавца', 'Токен на продажу', 'Токен получения', 'Кол-во на продажу', 'Кол-во получаемого'],
      placeholders: ['0x1', '0x111111111111111', '0x2222222222222222222', 1, 1],
      initialValues: { seller: coinbase() },
      autocomplete: {
        sale: true,
        buy: true
      }
    }
  }
  return {}
}
function mapDispatchToProps(dispatch, props) {
  return {
    onSubmit: bindActionCreators(form => submit(props.address, props.action, form), dispatch)
  }
}
export default reduxForm({
  form: 'FormMarket'
}, mapStateToProps, mapDispatchToProps)(Form)
