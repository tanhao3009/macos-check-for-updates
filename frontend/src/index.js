import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>

), document.getElementById('root'));