import { connect } from 'react-redux'
import { map, omit } from 'lodash'
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
    axios.get('http://localhost:3000/api/posts')
    .then(response => {
      this.props.fetchAllPost(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  handlePostSubmit(post) {
    axios.post('http://localhost:3000/api/posts', {text: post.text})
    .then(response => {
      this.props.storePost(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handlerDelete(post) {
    axios.delete('http://localhost:3000/api/posts', {data: {_id: post._id}})
    .then(response => {
      this.props.deletePost(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleDoneChange(post) {
    axios.post('http://localhost:3000/api/posts/:id/done', omit(post))
    .then(response => {
      this.props.storePost(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleTextUpdate(post) {
    axios.post('http://localhost:3000/api/posts/:id/text', omit(post))
    .then(response => {
      this.props.storePost(response.data)
    })
    .catch(function (error) {
      console.log(error);
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
