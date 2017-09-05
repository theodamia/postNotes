import '../style/css/style.css'
import '../style/styleJS.js'
import React from 'react'
import ReactDOM from 'react-dom'
import { Nav, NavBar, NavItem } from 'react-bootstrap'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { getState, resetLocalStore } from 'redux-localstore'
import store from '../store/index.js'
import Navigation from '../components/navigation/Navigation.js'

const state = getState();

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogOut = this.handleLogOut.bind(this);
  }
  handleLogOut() {
    resetLocalStore();
    window.location.reload();
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
export default connect(mapStateToProps)(App);
