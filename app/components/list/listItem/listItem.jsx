import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { MenuItem, DropdownButton } from 'react-bootstrap/lib';

import Icon from '../../icon/icon';
import './listItem.post.css';
import { STATUS_TYPES } from '../../../constants/';

const ListItem = (props) => {
  const { post } = props;

  return (
    <ListGroupItem className={classnames('list-item', {
        'list-item--default': post.status === 'default',
        'list-item--important': post.status === 'important',
        'list-item--ongoing': post.status === 'ongoing',
        'list-item--completed': post.status === 'completed',
    })}
    >
      <div className="list-item-title">
        <input
          type="text"
          readOnly="true"
          defaultValue={post.title}
          onBlur={(e) => { props.handleBlur(e, post._id, 'title'); }}
          onKeyDown={(e) => { props.handleKeyDown(e, 'title'); }}
        />
      </div>
      { props.checkText ?
        <div className="list-item-text">
          <input
            type="text"
            readOnly="true"
            defaultValue={post.text}
            onBlur={(e) => { props.handleBlur(e, post._id, 'text'); }}
            onKeyDown={(e) => { props.handleKeyDown(e, 'text'); }}
          />
        </div>
        : null }
      <div className="list-item-icons">
        <DropdownButton
          title="Status"
          id="dropdown-basic"
        >
          { STATUS_TYPES.map(status => (
            <MenuItem
              className="dropdown-item"
              eventKey={status.id}
              key={status.id}
              onSelect={() => { props.onStatusChange(post._id, status.type); }}
            >
              { capitalize(status.type) }
              <div className={`dropdown-palette dropdown-palette--${status.type}`} />
            </MenuItem>
          ))}
        </DropdownButton>
        <Icon
          className="fa fa-trash fa-fw icon"
          value="Delete"
          title="Delete"
          onClick={() => { props.handleDelete(post); }}
        />
      </div>
    </ListGroupItem>
  );
};

ListItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleKeyDown: PropTypes.func,
  checkText: PropTypes.bool,
  handleDelete: PropTypes.func,
};

ListItem.defaultProps = {
  post: {},
  checkText: false,
  handleBlur: () => false,
  handleKeyDown: () => false,
  handleDelete: () => false,
};


export default ListItem;
