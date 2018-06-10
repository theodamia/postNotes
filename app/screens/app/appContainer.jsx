import { connect } from 'react-redux';

import App from './app';
import logOutAsync from '../../actions/user';

const mapStateToProps = state => ({
  user: state.user.auth,
});

const mapDispatchToProps = dispatch => ({
  logOutAsync: () => dispatch(logOutAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
