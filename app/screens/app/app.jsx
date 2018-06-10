import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../../components/navigation/navigation';

import '../../style/css/style.post.css';
import './app.post.css';
import '../../style/styleJS';

const App = props => (
  <div className="app">
    <header>
      <Navigation {...props} />
    </header>
    <main>
      {React.cloneElement(props.children, { ...props })}
    </main>
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
