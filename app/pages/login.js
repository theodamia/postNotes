import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory } from 'react-router'

import {FormGroup, FormControl } from 'react-bootstrap'
import RegisterBtn from '../components/buttons/RegisterButton.js'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: '',
      password: '',
      isRegister: false,
      isLogin: false,
      textClicked: true
    };

    this.handleEmailChange    = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleUserRegister   = this.handleUserRegister.bind(this);
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();

    var email = this.state.email.trim();
    var password = this.state.password.trim();

    if(!email && !password) {
      return;
    }

    this.handleUserRegister({
      email: email,
      password: password,
      isRegister: true,
      isLogin: true
    });

    this.setState({
      email: '',
      password: '',
      isRegister: false,
      isLogin: false
    });
  }
  handleUserRegister(user) {
    var users = this.state.data;

    $.ajax({
      url: 'http://localhost:3000/api/users',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        var newUsers = users.concat([data]);
        this.setState({data: newUsers});
        hashHistory.push('/')
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: users});
      }.bind(this)
    });
  }
  render() {
    const propTextClicked = {
      textClicked: this.state.textClicked
    }
    return (
      <div className="col-lg-12">
        <div className="login-box">
          <h1>{this.state.textClicked ? 'Register with Email' : 'Login with Email'}</h1>
          <div className="login-text">
            {this.state.textClicked ? 'Already have an account? ' : 'You need an account? ' }
            <a onClick={() => this.setState({textClicked: !this.state.textClicked})}>{this.state.textClicked ? 'Login now.' : 'Register.'}</a>
          </div>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl
                  className="login-field"
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}/>
                <FormControl
                  className="login-field"
                  type="Password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}/>
                <div>
                  <RegisterBtn {...propTextClicked} />
                </div>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
