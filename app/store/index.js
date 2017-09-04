import { createStore, combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { hashHistory } from 'react-router'
import storeSynchronize from 'redux-localstore'
import PostReducer from '../reducers/post'
import UserReducer from '../reducers/user'

const store = createStore(
  combineReducers({
    post: PostReducer,
    user: UserReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;

storeSynchronize(store)
