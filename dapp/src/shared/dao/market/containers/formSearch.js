import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import { search } from '../../../../modules/market/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state) {
  const fields = [
    {
      name: 'sale',
      type: 'autocomplete',
      label: i18next.t('market:formSearchSale'),
      value: state.market.search.sale,
      validation: 'address'
    },
    {
      name: 'buy',
      type: 'autocomplete',
      label: i18next.t('market:formSearchBuy'),
      value: state.market.search.buy,
      validation: 'address'
    }
  ]
  return {
    fields,
    initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: bindActionCreators(form => search(form), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'FormMarketSearch',
  validate,
})(Form))
