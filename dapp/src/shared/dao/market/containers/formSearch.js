import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import { search } from '../../../../modules/market/actions';
import Form from '../../../components/common/form';

function mapStateToProps(state) {
  return {
    fields: ['sale', 'buy'],
    labels: [i18next.t('market:formSearchSale'), i18next.t('market:formSearchBuy')],
    initialValues: {
      sale: state.market.search.sale,
      buy: state.market.search.buy
    },
    autocomplete: {
      sale: true,
      buy: true
    }
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(form => search(form), dispatch)
  }
}
export default reduxForm({
  form: 'FormMarketSearch'
}, mapStateToProps, mapDispatchToProps)(Form)
