import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import i18next from 'i18next'
import _ from 'lodash'
import hett from 'hett'
import { submit } from '../../../../modules/market/actions';
import Form from '../../../components/common/form';
import { validate } from '../../../../utils/helper';

function mapStateToProps(state, props) {
  if (props.action === 'setCommissionToken') {
    return {
      fields: [
        {
          name: '_token',
          type: 'autocomplete',
          label: i18next.t('market:formCommissionToken'),
          placeholder: '0x111111111111111',
          validation: 'address'
        }
      ]
    }
  } else if (props.action === 'setCommission') {
    return {
      fields: [
        {
          name: '_commission',
          label: i18next.t('market:formCommission'),
          placeholder: '1',
          validation: 'uint'
        }
      ]
    }
  } else if (props.action === 'lot') {
    const fields = [
      {
        name: '_seller',
        label: i18next.t('market:formSeller'),
        placeholder: '0x1',
        value: hett.web3h.coinbase(),
        validation: 'address'
      },
      {
        name: '_sale',
        type: 'autocomplete',
        label: i18next.t('market:formTokenSale'),
        placeholder: '0x111111111111111',
        validation: 'address'
      },
      {
        name: '_buy',
        type: 'autocomplete',
        label: i18next.t('market:formTokenBuy'),
        placeholder: '0x222222222222222',
        validation: 'address'
      },
      {
        name: '_quantity_sale',
        label: i18next.t('market:formAmountSale'),
        placeholder: '1',
        validation: 'uint'
      },
      {
        name: '_quantity_buy',
        label: i18next.t('market:formAmountBuy'),
        placeholder: '1',
        validation: 'uint'
      }
    ]
    return {
      fields,
      initialValues: _.zipObject(_.map(fields, 'name'), _.map(fields, 'value'))
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
  form: 'FormMarket',
  validate,
})(Form))
