import '../style/css/style.css'
import '../style/styleJS.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { getState, resetLocalStore } from 'redux-localstore'
import store from '../store/index.js'
import { isEmpty } from 'lodash'

import {Nav, NavItem} from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

const state = getState();

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    resetLocalStore();
    window.location.reload();
  }
  render() {
    const props = {
      user: this.props.user
    }
    return (
      <div className="container">
        <header className="row">
          <Navigation {...props} handleLogOut={this.handleLogOut} />
        </header>
        <main className="row">
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user.auth
  }
};
export default connect(mapStateToProps)(App);

class Navigation extends React.Component {
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
            <NavItem><Link onClick={() => {isEmpty(this.props.user) ? '' : this.props.handleLogOut()}} to={isEmpty(this.props.user) ? '/RegisterOrLogin' : '/'}>{isEmpty(this.props.user) ? 'Login' : 'Logout ' + this.props.user.email}</Link></NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}
