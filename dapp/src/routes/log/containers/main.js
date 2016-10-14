import { connect } from 'react-redux'
import { Main } from '../components/main';

function mapStateToProps(state) {
  const items = state.log.items
  return {
    items
  }
}

export default connect(mapStateToProps)(Main)
