import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
  className,
  title,
  value,
  type,
  onClick,
}) => (
  <i
    className={className}
    value={value}
    title={title}
    type={type}
    onClick={onClick}
    role="presentation"
  />
);

Icon.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  className: '',
  title: '',
  value: '',
  type: '',
  onClick: () => false,
};

export default Icon;
