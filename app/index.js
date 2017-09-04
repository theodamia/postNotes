import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import routes from './routes'
import store from './store/index'

// console.log(store);
ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
), document.getElementById('content'))
