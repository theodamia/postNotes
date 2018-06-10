import { map } from 'lodash';
import { connect } from 'react-redux';

import Main from './main';
import { storePostAsync, fetchAllPostAsync, deletePostAsync,
  updatePostTitle, updatePostText, updatePostStatus } from '../../actions/post';

const mapStateToProps = state => ({
  posts: map(state.post.collection, item => item),
});

const mapDispatchToProps = dispatch => ({
  storePostAsync: post => dispatch(storePostAsync(post)),
  fetchAllPostAsync: () => dispatch(fetchAllPostAsync()),
  updatePostTitle: post => dispatch(updatePostTitle(post)),
  updatePostText: post => dispatch(updatePostText(post)),
  updatePostStatus: post => dispatch(updatePostStatus(post)),
  deletePostAsync: post => dispatch(deletePostAsync(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
