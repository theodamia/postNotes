import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import PostReducer from '../reducers/post'
import UserReducer from '../reducers/user'

const store = createStore(
  combineReducers({
    post: PostReducer,
    user: UserReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

)

export default store;
