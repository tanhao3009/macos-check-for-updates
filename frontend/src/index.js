import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'

import App from './components/App';

// How to config: Connected React Router (in) React 16.4 and React Redux 6.0 or later.
// https://github.com/supasate/connected-react-router

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <> { /* your usual react-router v4/v5 routing */ }
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));