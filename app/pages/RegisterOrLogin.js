import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { signUp, logIn } from '../actions/user'

import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import CButton from '../components/button/CButton'

class RegisterOrLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      email: '',
      password: '',
      isRegister: false,
      isLogin: false,
      registerOrLogin: false,
      userExistText: false
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
        password: password,
        isRegister: true,
        isLogin: true
      });
    } else {
      this.handleLogIn({
        email: email,
        password: password
      });
    }

    this.setState({
      email: '',
      password: '',
      isRegister: false,
      isLogin: false
    });
  }
  handleUserRegister(user) {
    axios.post('http://localhost:3000/api/users', {email: user.email, password: user.password})
    .then(response => {
      this.props.signUp(response.data)
      // hashHistory.push('public/#/user=' + response.data.email);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleLogIn(user) {
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/login',
      withCredentials: true,
      data: {
        email: user.email,
        password: user.password
      }
    })
    .then(response => {
      this.props.logIn(response.data);
      console.log(response.data);
      hashHistory.push('/?user=' + response.data.email + '/');
    })
    .catch(function (error) {
      console.log(error);
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
                <ControlLabel className="alert-text">{this.state.userExistText ? 'User already exist!!' : '' }</ControlLabel>
                <div>
                  <CButton bsStyle="success" id="btn-register" type="submit" text={this.state.registerOrLogin ? 'Register' : 'Login'} />
                </div>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    users: map(state.user.collection, item => item)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => {
      dispatch(signUp(user));
    },
    logIn: (user) => {
      dispatch(logIn(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOrLogin);
