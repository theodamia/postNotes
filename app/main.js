import './style/css/style.css';
import './style/styleJS.js';
import React from 'react';
import ReactDOM from 'react-dom';

import PostForm from './components/form/form.js';
import AddButton from './components/buttons/AddButton.js'
import DoneButton from './components/buttons/DoneButton.js'
import DeleteButton from './components/buttons/DeleteButton.js'
import UndoneButton from './components/buttons/UndoneButton.js'

import ListGroup from 'react-bootstrap/lib/ListGroup.js';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';

class PostBox extends React.Component {
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
        this.setState({data: data});
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
        var newPosts = posts.concat([data]);
        this.setState({data: newPosts});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: posts});
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
        this.loadPostsFromServer();
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
        this.loadPostsFromServer();
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
        this.loadPostsFromServer();
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
      data: this.state.data
    }
    return (
      <div className="container">
        <div className="row">
          <FormBox onPostSubmit={this.handlePostSubmit} />
        </div>
        <div className="row">
          <PostList {...props} onTextUpdate={this.handleTextUpdate} handlerDelete={this.handlerDelete} handleDoneChange={this.handleDoneChange} />
          <FavouriteList {...props} handlerDelete={this.handlerDelete} handleDoneChange={this.handleDoneChange}/>
        </div>
      </div>
    );
  }
}

class FormBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleKeyDown    = this.handleKeyDown.bind(this);
  }
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    var text = this.state.text.trim();

    if(!text) {
      return;
    }
    this.props.onPostSubmit({text: text});
    this.setState({text: ''});
  }
  handleKeyDown(e) {
    if(e.keyCode == 13) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <div className="col-lg-12">
        <div className="ta-center md-margintop md-marginbot">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl
                className="center"
                componentClass="textarea"
                placeholder="Write a Note..."
                value={this.state.text}
                onChange={this.handleTextChange}
                onKeyDown={this.handleKeyDown}
              />
              <div className="sm-margintop">
                <AddButton />
              </div>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnBlur = this.handleOnBlur.bind(this);
  }
  handleOnBlur(e) {
    e.preventDefault();

    var text = e.target.value.trim();
    var _id = e.target.getAttribute('data-id');

    if(!text) {
      return;
    }

    this.props.onTextUpdate({
      text: text,
      _id: _id
    });
  }
  render() {
    var postNodes = this.props.data.map((post) => {
      if(post.done == false) {
        return (
          <Post key={post._id}>
            <input data-id={post._id} className="npt-text" type="text" readOnly="true" defaultValue={post.text}
              onBlur={this.handleOnBlur} />
            <span>
              <DoneButton handleDoneChange={() => {this.props.handleDoneChange(post)}} />
              <DeleteButton handlerDelete={() => {this.props.handlerDelete(post)}} />
            </span>
          </Post>
        )
      };
    });
    return (
      <div className="post-list col-lg-6">
        <h3 className="sm-marginbot">Notes List</h3>
        <ListGroup className="list">
          {postNodes}
        </ListGroup>
      </div>
    );
  }
}

class FavouriteList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var postNodes = this.props.data.map((post) => {
      if(post.done == true) {
        return (
          <Post key={post._id}>
            {post.text}
            <span>
              <UndoneButton handleDoneChange={() => {this.props.handleDoneChange(post)}} />
              <DeleteButton handlerDelete={() => {this.props.handlerDelete(post)}} />
            </span>
          </Post>
        )
      }
    });
    return (
      <div className="col-lg-6">
        <h3 className="sm-marginbot">Done</h3>
        <ListGroup className="list">
          {postNodes}
        </ListGroup>
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ListGroupItem>{this.props.children}</ListGroupItem>
    );
  }
}

ReactDOM.render(
  <PostBox />,
  document.getElementById('content')
);
