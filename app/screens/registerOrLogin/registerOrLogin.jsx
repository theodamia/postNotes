import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import Button from '../../components/button/button';
import './registerOrLogin.post.css';

class RegisterOrLogin extends React.Component {
  state = {
    email: '',
    password: '',
    registerOrLogin: false,
    userExist: false,
    wrongUser: false,
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();

    if (!email && !password) {
      return;
    }

    if (this.state.registerOrLogin) {
      this.handleUserRegister({
        email,
        password,
      });
    } else {
      this.handleLogIn({
        email,
        password,
      });
    }

    this.setState({
      email: '',
      password: '',
    });
  }
  handleUserRegister = (user) => {
    this.props.signUpAsync(user);
  }
  handleLogIn = (user) => {
    this.props.logInAsync(user);
  }
  render() {
    return (
      <section className="login">
        <h1>{this.state.registerOrLogin ? 'Register with Email' : 'Login with Email'}</h1>
        <div className="login-text">
          {this.state.registerOrLogin ? 'Already have an account? ' : 'You need an account? ' }
          <button
            onClick={() => this.setState({ registerOrLogin: !this.state.registerOrLogin })}
            onKeyPress={() => this.setState({ registerOrLogin: !this.state.registerOrLogin })}
          >
            {this.state.registerOrLogin ? 'Login now.' : 'Register.'}
          </button>
        </div>
        <div className="login-form">
          <form onSubmit={this.handleSubmit} >
            <FormGroup>
              <FormControl
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <FormControl
                type="Password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <ControlLabel className="alert-text">
                {this.state.userExist ? 'User already exist!' : '' }
                {this.state.wrongUser ? 'Wrong username or password!' : ''}
              </ControlLabel>
              <div>
                <Button bsStyle="success" type="submit" text={this.state.registerOrLogin ? 'Register' : 'Login'} />
              </div>
            </FormGroup>
          </form>
        </div>
      </section>
    );
  }
}

RegisterOrLogin.propTypes = {
  signUpAsync: PropTypes.func,
  logInAsync: PropTypes.func,
};

RegisterOrLogin.defaultProps = {
  signUpAsync: () => false,
  logInAsync: () => false,
};

export default RegisterOrLogin;
