import { connect } from 'react-redux'
import CreateModule from '../components/createModule';

function mapStateToProps(store, props) {
  let title
  switch (props.module) {
    case 'core':
      title = 'titleCreateCore'
      break
    case 'issuer':
      title = 'titleCreateIssuer'
      break
    case 'auditor':
      title = 'titleCreateAuditor'
      break
    case 'complier':
      title = 'titleCreateComplier'
      break
    case 'market':
      title = 'titleCreateMarket'
      break
    case 'acl':
      title = 'titleCreateAcl'
      break
    case 'token':
      title = 'titleCreateToken'
      break
    case 'tokenAcl':
      title = 'titleCreateTokenAcl'
      break
    case 'docs':
      title = 'titleCreateDocs'
      break
    default:
      title = '';
  }
  return {
    title,
    module: props.module
  }
}

export default connect(mapStateToProps)(CreateModule)
