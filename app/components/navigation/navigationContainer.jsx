import { connect } from 'react-redux';

import Navigation from './navigation';
import { logOutAsync } from '../../actions/user';

const mapStateToProps = state => ({
  user: state.user.auth,
});

const mapDispatchToProps = dispatch => ({
  logOutAsync: () => dispatch(logOutAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
