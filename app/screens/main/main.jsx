import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import List from '../../components/list/list';
import Form from '../../components/form/form';

import './main.post.css';

class Main extends React.Component {
  componentDidMount() {
    this.props.fetchAllPostAsync();
  }
  handlePostSubmit = (post) => {
    if (isEmpty(this.props.user)) {
      this.props.storePostAsync(post);
    } else {
      post.userID = this.props.user._id;
      this.props.storePostAsync(post);
    }
  }
  handleTitleUpdate = (post) => {
    this.props.updatePostTitle(post);
  }
  handleTextUpdate = (post) => {
    this.props.updatePostText(post);
  }
  handleStatusUpdate = (post) => {
    this.props.updatePostStatus(post);
  }
  handleDelete = (post) => {
    this.props.deletePostAsync(post);
  }
  filterPosts = (status) => {
    if (status === 'completed') {
      return this.props.posts.filter(post => post.status === 'completed');
    }
    return this.props.posts.filter(post => post.status !== 'completed');
  }
  render() {
    const completedPosts = this.filterPosts('completed');
    const uncompletedPosts = this.filterPosts('uncompleted');

    return (
      <section className="main">
        <Form onPostSubmit={this.handlePostSubmit} />
        <div className="list-area">
          <List
            completed={false}
            posts={uncompletedPosts}
            onTitleUpdate={this.handleTitleUpdate}
            onTextUpdate={this.handleTextUpdate}
            onStatusUpdate={this.handleStatusUpdate}
            handleDelete={this.handleDelete}
          />
          <List
            completed
            posts={completedPosts}
            onTitleUpdate={this.handleTitleUpdate}
            onTextUpdate={this.handleTextUpdate}
            onStatusUpdate={this.handleStatusUpdate}
            handleDelete={this.handleDelete}
          />
        </div>
      </section>
    );
  }
}

Main.propTypes = {
  fetchAllPostAsync: PropTypes.func,
  storePostAsync: PropTypes.func,
  updatePostTitle: PropTypes.func,
  updatePostText: PropTypes.func,
  updatePostStatus: PropTypes.func,
  deletePostAsync: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  posts: PropTypes.arrayOf(PropTypes.object),
};

Main.defaultProps = {
  fetchAllPostAsync: () => false,
  storePostAsync: () => false,
  updatePostTitle: () => false,
  updatePostText: () => false,
  updatePostStatus: () => false,
  deletePostAsync: () => false,
  user: {},
  posts: [],
};

export default Main;
