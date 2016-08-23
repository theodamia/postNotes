import './css/style.css';
var React = require('react');
var ReactDOM = require('react-dom');

import TodoForm from './components/form/form.js';
import ListGroup from 'react-bootstrap/lib/ListGroup.js';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js';

import FormGroup from 'react-bootstrap/lib/FormGroup.js';
import FormControl from 'react-bootstrap/lib/FormControl.js';
import AddButton from './components/buttons/AddButton.js';


var PostBox = React.createClass({
  loadPostsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        // console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePostSubmit: function(post) {
    var posts = this.state.data;

    post.id = Date.now();
    var newPosts = posts.concat([post]);
    this.setState({data: newPosts});

    $.ajax({
      url: this.props.url,
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
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <PostForm onPostSubmit={this.handlePostSubmit} />
        </div>
        <div className="row">
          <PostList data={this.state.data} />
          <FavouriteList data={this.state.data} />
        </div>
      </div>
    );
  }
});

// var PostForm = React.createClass({
//   render: function() {
//     return (
//       <div className="col-lg-12">
//         <div className="ta-center md-margintop md-marginbot">
//           <TodoForm />
//         </div>
//       </div>
//     );
//   }
// });
var PostForm = React.createClass({
  getInitialState: function() {
   return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();

    if(!text) {
      return;
    }

    this.props.onPostSubmit({text: text});
    this.setState({text: ''});
  },
  render: function() {
    return (
      <div className="col-lg-12">
        <div className="ta-center md-margintop md-marginbot">
          <form onSubmit={this.handleSubmit} >
            <FormGroup>
              <FormControl
                className="center"
                componentClass="textarea"
                placeholder="Write a Post..."
                value={this.state.text}
                onChange={this.handleTextChange}
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
});

var PostList = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post key={post.id}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="col-lg-6 ta-center">
        <h3 className="sm-marginbot">Post List</h3>
        <ListGroup>
          {postNodes}
        </ListGroup>
      </div>
    );
  }
});

var FavouriteList = React.createClass({
  render: function () {
    var favouriteNodes = this.props.data.map(function (post) {
      return (
        <Post key={post.id}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="col-lg-6 ta-center">
        <h3 className="sm-marginbot">Favourite List</h3>
        <ListGroup>
          {favouriteNodes}
        </ListGroup>
      </div>
    );
  }
});


var Post = React.createClass({
  render: function() {
    return (
      <ListGroupItem>{this.props.children}</ListGroupItem>
    );
  }
});

ReactDOM.render(
  <PostBox url="/api/posts" pollInterval={2000} />,
  document.getElementById('content')
);
