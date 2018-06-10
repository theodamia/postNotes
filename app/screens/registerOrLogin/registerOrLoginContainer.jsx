import { connect } from 'react-redux';
import { map } from 'lodash';

import RegisterOrLogin from './registerOrLogin';
import { signUpAsync, logInAsync } from '../../actions/user';

const mapStateToProps = state => ({
  users: map(state.user.auth, item => item),
});

const mapDispatchToProps = dispatch => ({
  signUpAsync: user => dispatch(signUpAsync(user)),
  logInAsync: user => dispatch(logInAsync(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOrLogin);
