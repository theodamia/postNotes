/* eslint-env browser */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import PostReducer from '../reducers/post';
import UserReducer from '../reducers/user';

const store = createStore(
  combineReducers({
    post: PostReducer,
    user: UserReducer,
  }),
  compose(
    applyMiddleware(thunk),
    /* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
