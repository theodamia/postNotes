import React from 'react';
import PropTypes from 'prop-types';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import './searchItem.post.css';

const SearchItem = ({
  onChange,
}) => (
  <ListGroupItem>
    <input
      className="search-item"
      type="text"
      placeholder="  Search note by title"
      onChange={onChange}
    />
  </ListGroupItem>
);

SearchItem.propTypes = {
  onChange: PropTypes.func,
};

SearchItem.defaultProps = {
  onChange: () => false,
};

export default SearchItem;
