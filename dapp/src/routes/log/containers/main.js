import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Main } from '../components/main';
import { clear } from '../../../modules/log/actions';

function mapStateToProps(state) {
  const items = state.log.items
  return {
    items
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ clear }, dispatch)
  return {
    onClear: actions.clear
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
