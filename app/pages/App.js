import '../style/css/style.css'
import '../style/styleJS.js'
import { Nav, NavBar, NavItem } from 'react-bootstrap'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
// import { getState, resetLocalStore } from 'redux-localstore'
// import store from '../store/index.js'
import Navigation from '../components/navigation/Navigation.js'
import { logOut } from '../actions/post'

// const state = getState();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    // resetLocalStore();
    // window.location.reload();
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/users/logout',
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      console.log(response);
      console.log(this.props.user);
      console.log("mplampla");
      // hashHistory.push('/');
    })
    .catch((error) => {
      console.log(error);
      console.log("mplampla");
      console.log(this.props.user);
      this.props.logOut();
    });
  }
  render() {
    console.log(document.cookie);
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
    logOut: () => {
      dispatch(logOut());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
