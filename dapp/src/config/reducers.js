import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux'
import * as modules from '../modules/reducers';

export default combineReducers({
  ...modules,
  form: formReducer,
  notifications
})
