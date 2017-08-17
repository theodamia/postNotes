import './style/css/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
// import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Router, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import NavBar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

import Main from './pages/main'
import routes from './routes'

class App extends React.Component {
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
          <Main />
          // {this.props.children}
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
            <NavItem href="/login">Log in</NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}

const history = createBrowserHistory();
ReactDOM.render (
  // <Router routes={routes} history={history} />,
  //  document.getElementById('content')
  <App />,
  document.getElementById('content')
);
