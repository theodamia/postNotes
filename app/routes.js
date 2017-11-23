import { Route, IndexRoute } from 'react-router'

import App from './pages/App'
import Main from './pages/Main'
import RegisterOrLogin from './pages/RegisterOrLogin'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/RegisterOrLogin" component={RegisterOrLogin} />
  </Route>
);
