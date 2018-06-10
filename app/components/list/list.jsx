import React from 'react';
import PropTypes from 'prop-types';
import { lowerCase } from 'lodash';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListItem from './listItem/listItem';
import SearchItem from './searchItem/searchItem';

import './list.post.css';

class List extends React.Component {
  state = {
    searchValue: '',
  };
  onSearchChange = (e) => {
    const searchValue = e.target.value.trim();
    this.setState({ searchValue });
  }
  onStatusChange = (_id, status) => {
    this.props.onStatusUpdate({
      _id,
      status,
    });
  }
  handleBlur = (e, _id, kind) => {
    e.preventDefault();

    if (kind === 'text') {
      const text = e.target.value.trim();

      this.props.onTextUpdate({
        _id,
        text,
      });
    } else if (kind === 'title') {
      const title = e.target.value.trim();

      if (!title) {
        return;
      }

      this.props.onTitleUpdate({
        _id,
        title,
      });
    }
  }
  handleKeyDown = (e, kind) => {
    if (e.keyCode === 13) {
      this.handleBlur(e, kind);
    }
  }
  filterSearchValue = () => (
    this.props.posts.filter(post => lowerCase(post.title)
      .includes(lowerCase(this.state.searchValue)))
  )
  render() {
    return (
      <section className="list">
        <h3>{this.props.completed ? 'Completed Notes' : 'Notes List'}</h3>
        <ListGroup>
          <SearchItem onChange={this.onSearchChange} />
          {this.filterSearchValue().map(post => (
            <ListItem
              key={post._id}
              post={post}
              handleBlur={this.handleBlur}
              handleKeyDown={this.handleKeyDown}
              onStatusChange={this.onStatusChange}
              handleDelete={this.props.handleDelete}
              checkText={!!post.text}
            />
          ))}
        </ListGroup>
      </section>
    );
  }
}

List.propTypes = {
  onStatusUpdate: PropTypes.func,
  onTextUpdate: PropTypes.func,
  onTitleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object),
  completed: PropTypes.bool,
};

List.defaultProps = {
  onStatusUpdate: () => false,
  onTextUpdate: () => false,
  onTitleUpdate: () => false,
  handleDelete: () => false,
  posts: [],
  completed: false,
};

export default List;
