import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { signUpAsync, logInAsync } from '../actions/user'

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import Button from '../components/button/Button'

class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      registerOrLogin: false,
      userExist: false,
      wrongUser: false
    };

    this.handleEmailChange    = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleUserRegister   = this.handleUserRegister.bind(this);
    this.handleLogIn          = this.handleLogIn.bind(this);
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

    if(this.state.registerOrLogin) {
      this.handleUserRegister({
        email: email,
        password: password
      });
    } else {
      this.handleLogIn({
        email: email,
        password: password
      });
    }

    this.setState({
      email: '',
      password: ''
    });
  }
  handleUserRegister(user) {
    var that = this;
    this.props.signUpAsync(user).catch(function (error) {
      if(error.response.status == '409') {
        that.setState({userExist: true});
      }
    });
  }
  handleLogIn(user) {
    var that = this;
    this.props.logInAsync(user).catch(error => {
      if(error.response.status == '401') {
        that.setState({wrongUser: true});
      }
    });
  }
  render() {
    return (
      <div className="col-lg-12">
        <div className="login-box">
          <h1>{this.state.registerOrLogin ? 'Register with Email' : 'Login with Email'}</h1>
          <div className="login-text">
            {this.state.registerOrLogin ? 'Already have an account? ' : 'You need an account? ' }
            <a onClick={() => this.setState({registerOrLogin: !this.state.registerOrLogin})}>{this.state.registerOrLogin ? 'Login now.' : 'Register.'}</a>
          </div>
          <div className="login-form">
            <form onSubmit={this.handleSubmit} >
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
                <ControlLabel className="alert-text">
                  {this.state.userExist ? 'User already exist!' : '' }
                  {this.state.wrongUser ? 'Wrong username or password!' : ''}
                </ControlLabel>
                <div>
                  <Button bsStyle="success" className="btn-register" type="submit" text={this.state.registerOrLogin ? 'Register' : 'Login'} />
                </div>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    users: _.map(state.user.auth, item => item)
});

const mapDispatchToProps = (dispatch) => ({
  signUpAsync: (user) => dispatch(signUpAsync(user)),
  logInAsync: (user) => dispatch(logInAsync(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOrLogin);
