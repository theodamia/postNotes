import React from 'react'
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import { isEmpty } from 'lodash'

import {Nav, NavItem} from 'react-bootstrap'
import NavBar from 'react-bootstrap/lib/Navbar'

export default class Navigation extends React.Component {
  render() {
    return (
      <div className="col-lg-12 md-margintop">
        <NavBar id="nav-bar">
          <NavBar.Header>
            <NavBar.Brand>
              <a id="nav-brand" href="./">Post Notes</a>
            </NavBar.Brand>
          </NavBar.Header>
          <Nav id="nav-list">
            <LinkContainer className="nav-item" onClick={() => {isEmpty(this.props.user) ? '' : this.props.handleLogOut()}} to={isEmpty(this.props.user) ? '/RegisterOrLogin' : '/'}>
              <NavItem>{isEmpty(this.props.user) ? 'Login' : 'Logout ' + this.props.user.email}</NavItem>
            </LinkContainer>
            <NavItem href="/about">About</NavItem>
          </Nav>
        </NavBar>
      </div>
    );
  }
}
