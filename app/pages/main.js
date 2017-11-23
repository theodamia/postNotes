import { connect } from 'react-redux'
import { storePostAsync, fetchAllPostAsync, deletePostAsync, updatePostTest, updatePostDone } from '../actions/post'

import PostList from '../components/list/PostList.js'
import PostForm from '../components/form/PostForm.js'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.handlePostSubmit     = this.handlePostSubmit.bind(this);
    this.handlerDelete        = this.handlerDelete.bind(this);
    this.handleDoneChange     = this.handleDoneChange.bind(this);
    this.handleTextUpdate     = this.handleTextUpdate.bind(this);
    this.filterPosts          = this.filterPosts.bind(this);
  }
  handlePostSubmit(post) {
    this.props.storePostAsync(post);
  }
  handlerDelete(post) {
    this.props.deletePostAsync(post);
  }
  handleDoneChange(post) {
    this.props.updatePostDone(post);
  }
  handleTextUpdate(post) {
    this.props.updatePostTest(post);
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
            onTextUpdate={this.handleTextUpdate}
            handlerDelete={this.handlerDelete}
            handleDoneChange={this.handleDoneChange} />
          <PostList
            done={true}
            posts={postsDone}
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
    updatePostTest: (post) => dispatch(updatePostTest(post)),
    updatePostDone: (post) => dispatch(updatePostDone(post))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
