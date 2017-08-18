import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'
import Main from './pages/main'
import Login from './pages/login'

export default (
  <Route path="/" component={App}>
   <IndexRoute component={Main} />
   <Route path="/Login" component={Login} />
 </Route>
);
