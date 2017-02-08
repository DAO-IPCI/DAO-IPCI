import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { submit } from '../../../../modules/market/actions';
import Form from '../../../components/common/form';
import { coinbase } from '../../../../utils/web3'

function mapStateToProps(state, props) {
  if (props.action === 'setCommissionToken') {
    return {
      fields: ['address'],
      selects: {},
      labels: [i18next.t('market:formCommissionToken')],
      placeholders: ['0x111111111111111'],
      autocomplete: {
        address: true
      }
    }
  } else if (props.action === 'setCommission') {
    return {
      fields: ['value'],
      selects: {},
      labels: [i18next.t('market:formCommission')],
      placeholders: ['1']
    }
  } else if (props.action === 'lot') {
    return {
      fields: ['seller', 'sale', 'buy', 'quantity_sale', 'quantity_buy'],
      selects: {},
      labels: [i18next.t('market:formSeller'), i18next.t('market:formTokenSale'), i18next.t('market:formTokenBuy'), i18next.t('market:formAmountSale'), i18next.t('market:formAmountBuy')],
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
