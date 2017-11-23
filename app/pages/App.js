import '../style/css/style.scss'
import '../style/styleJS.js'
import { Nav, NavBar, NavItem } from 'react-bootstrap'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import Navigation from '../components/navigation/Navigation.js'
import { logInAsync, logOutAsync } from '../actions/user'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    this.props.logOutAsync();
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

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAsync: () => {
      dispatch(logOutAsync());
    }
    // logInAsync: (user) => {
    //   dispatch(logInAsync(user));
    // }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
