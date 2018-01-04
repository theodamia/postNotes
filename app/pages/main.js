import { connect } from 'react-redux'
import { storePostAsync, fetchAllPostAsync, deletePostAsync,
  updatePostTitle, updatePostText, updatePostStatus } from '../actions/post'

import PostList from '../components/list/PostList.js'
import PostForm from '../components/form/PostForm.js'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.handlePostSubmit     = this.handlePostSubmit.bind(this);
    this.handleTitleUpdate    = this.handleTitleUpdate.bind(this);
    this.handleTextUpdate     = this.handleTextUpdate.bind(this);
    this.handleStatusUpdate   = this.handleStatusUpdate.bind(this);
    this.handlerDelete        = this.handlerDelete.bind(this);
    this.filterPosts          = this.filterPosts.bind(this);
  }
  handlePostSubmit(post) {
    if(_.isEmpty(this.props.user)) {
      this.props.storePostAsync(post);
    } else {
      post.userID = this.props.user._id;
      this.props.storePostAsync(post);
    }
  }
  handleTitleUpdate(post) {
    this.props.updatePostTitle(post);
  }
  handleTextUpdate(post) {
    this.props.updatePostText(post);
  }
  handleStatusUpdate(post) {
    this.props.updatePostStatus(post);
  }
  handlerDelete(post) {
    this.props.deletePostAsync(post);
  }
  filterPosts(status) {
    if(status === "completed") {
      return this.props.posts.filter(post => post.status === "completed");
    } else {
      return this.props.posts.filter(post => post.status !== "completed");
    }
  }
  componentDidMount() {
    this.props.fetchAllPostAsync();
  }
  render() {
    var completedPosts = this.filterPosts("completed");
    var uncompletedPosts = this.filterPosts("uncompleted");

    return (
      <div className="col-lg-12">
        <div className="row">
          <PostForm onPostSubmit={this.handlePostSubmit} />
        </div>
        <div className="row">
          <PostList
            completed={false}
            posts={uncompletedPosts}
            onTitleUpdate={this.handleTitleUpdate}
            onTextUpdate={this.handleTextUpdate}
            onStatusUpdate={this.handleStatusUpdate}
            handlerDelete={this.handlerDelete}
          />
          <PostList
            completed={true}
            posts={completedPosts}
            onTitleUpdate={this.handleTitleUpdate}
            onTextUpdate={this.handleTextUpdate}
            onStatusUpdate={this.handleStatusUpdate}
            handlerDelete={this.handlerDelete}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  posts: _.map(state.post.collection, item => item)
});

const mapDispatchToProps = (dispatch) => ({
  storePostAsync: (post) => dispatch(storePostAsync(post)),
  fetchAllPostAsync: () => dispatch(fetchAllPostAsync()),
  updatePostTitle: (post) => dispatch(updatePostTitle(post)),
  updatePostText: (post) => dispatch(updatePostText(post)),
  updatePostStatus: (post) => dispatch(updatePostStatus(post)),
  deletePostAsync: (post) =>dispatch(deletePostAsync(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
