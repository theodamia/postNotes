/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store/index';
import App from './screens/app/appContainer';
import Main from './screens/main/mainContainer';
import RegisterOrLogin from './screens/registerOrLogin/registerOrLogin';
import About from './screens/about/about';

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <App>
          <Switch>
            <Route exact path="/public" component={Main} />
            <Route path="/registerOrLogin" component={RegisterOrLogin} />
            <Route path="/about" component={About} />
          </Switch>
        </App>
      </Router>
    </Provider>
  ), document.getElementById('content'),
);
