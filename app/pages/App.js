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
          {React.cloneElement(this.props.children, { ...this.props })}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
    user: state.user.auth
});

const mapDispatchToProps = (dispatch) => ({
    logOutAsync: () => dispatch(logOutAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
