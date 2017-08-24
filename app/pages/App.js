import '../style/css/style.css'
import '../style/styleJS.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import { Nav, NavItem } from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

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
            <NavItem><Link to="/RegisterOrLogin">{this.props.isRegister ? 'Register' : 'Login'}</Link></NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}
