/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import store from './store/index';
import App from './screens/app/app';
import Main from './screens/main/mainContainer';
import RegisterOrLogin from './screens/registerOrLogin/registerOrLoginContainer';
import About from './screens/about/about';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="/registerOrLogin" component={RegisterOrLogin} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('content'),
);
