import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';

import './navigation.post.css';

const Navigation = props => (
  <section className="navigation">
    <nav>
      <Link
        className="nav-link"
        to="/registerOrLogin"
        href="/registerOrLogin"
        onClick={() => { isEmpty(props.user) ? '' : props.handleLogOut(); }}
      >
        { isEmpty(props.user) ? 'Login' : `Logout ${props.user.email}` }
      </Link>
      <Link className="nav-link logo" to="/public" href="/public">Posts Notes</Link>
      <Link className="nav-link" to="/about" href="/about">About</Link>
    </nav>
  </section>

);

Navigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
  handleLogOut: PropTypes.func,
};

Navigation.defaultProps = {
  user: {},
  handleLogOut: () => false,
};

export default Navigation;
