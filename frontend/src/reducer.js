import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import authorized from './reducers/authorized';
import settings from './reducers/settings';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings,
  authorized
})
export default createRootReducer