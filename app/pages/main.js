import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { storePost, fetchAllPost, deletePost } from '../actions/post'

import PostList from '../components/list/PostList.js'
import FormBox from '../components/form/FormBox.js'
import CButton from '../components/button/CButton.js'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.loadPostsFromServer  = this.loadPostsFromServer.bind(this);
    this.handlePostSubmit     = this.handlePostSubmit.bind(this);
    this.handlerDelete        = this.handlerDelete.bind(this);
    this.componentDidMount    = this.componentDidMount.bind(this);
    this.handleDoneChange     = this.handleDoneChange.bind(this);
    this.handleTextUpdate     = this.handleTextUpdate.bind(this);
  }
  loadPostsFromServer() {
    $.ajax({
      url: 'http://localhost:3000/api/posts',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function(data) {
        this.props.fetchAllPost(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  handlePostSubmit(post) {
    var posts = this.state.data;

    $.ajax({
      url: 'http://localhost:3000/api/posts',
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {
        this.props.storePost(data);
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }
  handlerDelete(post) {
    $.ajax({
      url: 'http://localhost:3000/api/posts',
      dataType: 'json',
      type: 'DELETE',
      data: post,
      success: function(data) {
        this.props.deletePost(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  }
  handleDoneChange(post) {
    $.ajax({
      url: 'http://localhost:3000/api/posts/:id/done',
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {
        this.props.storePost(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  }
  handleTextUpdate(post) {
    $.ajax({
      url: 'http://localhost:3000/api/posts/:id/text',
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {
        this.props.storePost(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadPostsFromServer();
  }
  render() {
    const props = {
      data: this.props.posts
    }
    return (
      <div className="col-lg-12">
        <div className="row">
          <FormBox onPostSubmit={this.handlePostSubmit} />
        </div>
        <div className="row">
          <PostList {...props} done={false} onTextUpdate={this.handleTextUpdate} handlerDelete={this.handlerDelete} handleDoneChange={this.handleDoneChange} />
          <PostList {...props} done={true} onTextUpdate={this.handleTextUpdate} handlerDelete={this.handlerDelete} handleDoneChange={this.handleDoneChange}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    posts: map(state.post.collection, item => item)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    storePost: (post) => {
      dispatch(storePost(post));
    },
    fetchAllPost: (post) => {
      dispatch(fetchAllPost(post));
    },
    deletePost: (post) => {
      dispatch(deletePost(post));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
