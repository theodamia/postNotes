import './style/css/style.css'
import './style/styleJS.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'

import { Nav, NavItem } from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

import Main from './pages/main'
// import routes from './routes'
import Login from './pages/login'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <header className="row">
          <Navigation />
        </header>
        <main className="row">
          {this.props.children}
        </main>
      </div>
    );
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-lg-12 md-margintop">
        <NavBar id="nav-bar">
          <NavBar.Header>
            <NavBar.Brand>
              <a href="./">Post Notes</a>
            </NavBar.Brand>
          </NavBar.Header>
          <Nav>
            <NavItem><Link to="/Login">Login</Link></NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/Login" component={Login}/>
    </Route>
  </Router>
), document.getElementById('content'))
