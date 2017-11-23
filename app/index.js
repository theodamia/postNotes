import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import store from './store/index'

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
), document.getElementById('content'))
