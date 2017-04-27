import './css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';

import PostForm from './components/form/form.js';
import AddButton from './components/buttons/AddButton.js'
import FavButton from './components/buttons/FavButton.js'

import ListGroup from 'react-bootstrap/lib/ListGroup.js';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js';
import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';

class PostBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pollInterval: 2000
    };

    this.loadPostsFromServer  = this.loadPostsFromServer.bind(this);
    this.handlePostSubmit     = this.handlePostSubmit.bind(this);
    this.componentDidMount    = this.componentDidMount.bind(this);
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

    post.id = Date.now();
    var newPosts = posts.concat([post]);
    this.setState({data: newPosts});

    $.ajax({
      url: 'http://localhost:3000/api/posts',
      dataType: 'json',
      type: 'POST',
      data: post,
      success: function(data) {

        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: posts});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.state.pollInterval);
  }
  handleKeyDown(event) {
    if (event.keyCode == 13) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <FormBox onPostSubmit={this.handlePostSubmit} />
        </div>
        <div className="row">
          <PostList data={this.state.data} />
          <FavouriteList data={this.state.data} />
        </div>
      </div>
    );
  }
}

// class FormBox extends React.Component {
//   render() {
//     return (
//       <div className="col-lg-12">
//         <div className="ta-center md-margintop md-marginbot">
//           <PostForm />
//         </div>
//       </div>
//     );
//   }
// }

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
  }
  render() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post key={post.id} >
          {post.text}
          <span>
            <FavButton />
          </span>
        </Post>
      );
    });
    return (
      <div className="col-lg-6">
        <h3 className="sm-marginbot">Note List</h3>
        <ListGroup className="list">
          {postNodes}
        </ListGroup>
      </div>
    );
  }
}

class FavouriteList extends React.Component {
  render() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post key={post.id}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="col-lg-6">
        <h3 className="sm-marginbot">Favourites Notes</h3>
        <ListGroup>
          {postNodes}
        </ListGroup>
      </div>
    );
  }
}

class Post extends React.Component {
  render() {
    return (
      <ListGroupItem>{this.props.children} </ListGroupItem>
    );
  }
}

ReactDOM.render(
  <PostBox />,
  document.getElementById('content')
);
