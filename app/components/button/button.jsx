import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.post.css';

const Button = ({
  title,
  text,
  value,
  type,
  onClick,
}) => {
  const containerClasses = classNames({
    'ui-button': true,
  });

  return (
    <button
      className={containerClasses}
      value={value}
      title={title}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  title: '',
  text: '',
  value: '',
  type: '',
  onClick: () => false,
};


export default Button;
