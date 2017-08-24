import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import routes from './routes'

ReactDOM.render((
  <Router history={hashHistory} routes={routes} />
), document.getElementById('content'))
