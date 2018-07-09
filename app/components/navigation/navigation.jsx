import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import './navigation.post.css';

class Navigation extends React.Component {
  handleLogout = () => {
    this.props.logOutAsync();
  }

  render() {
    console.log(this.props);
    return (
      <section className="navigation">
        <nav>
          <Link className="nav-link logo" to="/" href="/">Posts Notes</Link>
          <Link
            className="nav-link"
            to={isEmpty(this.props.user) ? '/registerOrLogin' : '/'}
            href={isEmpty(this.props.user) ? '/registerOrLogin' : '/'}
            onClick={isEmpty(this.props.user) ? null : this.handleLogout}
          >
            { isEmpty(this.props.user) ? 'Login' : `Logout ${this.props.user.email}` }
          </Link>
          <Link className="nav-link" to="/about" href="/about">About</Link>
        </nav>
      </section>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  logOutAsync: PropTypes.func,
};

Navigation.defaultProps = {
  user: {},
  logOutAsync: () => false,
};

export default Navigation;
