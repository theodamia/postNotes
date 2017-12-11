import { connect } from 'react-redux'
import { storePostAsync, fetchAllPostAsync, deletePostAsync,
  updatePostTitle, updatePostText, updatePostDone, updatePostStatus } from '../actions/post'

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
    this.handleDoneChange     = this.handleDoneChange.bind(this);
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
  handleDoneChange(post) {
    this.props.updatePostDone(post);
  }
  filterPosts(done) {
    return this.props.posts.filter(post => post.done === done);
  }
  componentDidMount() {
    this.props.fetchAllPostAsync();
  }
  render() {
    var postsDone = this.filterPosts(true);
    var postsUndone = this.filterPosts(false);

    return (
      <div className="col-lg-12">
        <div className="row">
          <PostForm onPostSubmit={this.handlePostSubmit} />
        </div>
        <div className="row">
          <PostList
            done={false}
            posts={postsUndone}
            onTitleUpdate={this.handleTitleUpdate}
            onTextUpdate={this.handleTextUpdate}
            onStatusUpdate={this.handleStatusUpdate}
            handlerDelete={this.handlerDelete}
            handleDoneChange={this.handleDoneChange}
          />
          <PostList
            done={true}
            posts={postsDone}
            onTitleUpdate={this.handleTitleUpdate}
            onTextUpdate={this.handleTextUpdate}
            handlerDelete={this.handlerDelete}
            handleDoneChange={this.handleDoneChange} />
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
    deletePostAsync: (post) =>dispatch(deletePostAsync(post)),
    updatePostTitle: (post) => dispatch(updatePostTitle(post)),
    updatePostText: (post) => dispatch(updatePostText(post)),
    updatePostDone: (post) => dispatch(updatePostDone(post)),
    updatePostStatus: (post) => dispatch(updatePostStatus(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
