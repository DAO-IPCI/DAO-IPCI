import { connect } from 'react-redux'
import { Main } from '../components/main';

function mapStateToProps(state) {
  return {
    dao_address: state.app.dao_address,
    role: state.app.role
  }
}

export default connect(mapStateToProps)(Main)
