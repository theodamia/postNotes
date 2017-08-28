import '../style/css/style.css'
import '../style/styleJS.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {map} from 'lodash'
import store from '../store/index.js';

import {fetchUser} from '../actions/user'

import { Nav, NavItem } from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

export class App extends React.Component {
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
    this.state = {
      data: []
    };
    this.loadUserFromServer = this.loadUserFromServer.bind(this);
    this.componentDidMount    = this.componentDidMount.bind(this);
  }
  loadUserFromServer() {
    $.ajax({
      url: 'http://localhost:3000/api/users',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
        this.props.fetchUser(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadUserFromServer();
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
            <NavItem><Link to="/RegisterOrLogin">Login</Link></NavItem>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state);
  return {
    users: map(state.user.collection, item => item)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (user) => {
      dispatch(fetchUser(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
