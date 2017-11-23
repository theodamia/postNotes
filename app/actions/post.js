import * as types from '../constants/index'

export function storePost(data) {
  return {
    type: types.STORE_POST,
    payload: data
  };
}

export function storePostAsync(post) {
  return dispatch => {
    return axios.post('http://localhost:3000/api/posts', {text: post.text})
    .then(response => {
       dispatch(storePost(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function updatePostTest(post) {
  return dispatch => {
    return axios.post('http://localhost:3000/api/posts/:id/text', _.omit(post))
    .then(response => {
      dispatch(storePost(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function updatePostDone(post) {
  return dispatch => {
    return axios.post('http://localhost:3000/api/posts/:id/done', _.omit(post))
    .then(response => {
      dispatch(storePost(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export function fetchAllPost(data) {
  return {
    type: types.FETCH_ALL_POST,
    payload: data
  };
}

export function fetchAllPostAsync() {
  return dispatch => {
    return axios.get('http://localhost:3000/api/posts')
    .then(response => {
      dispatch(fetchAllPost(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function deletePost(data) {
  return {
    type: types.DELETE_POST,
    payload: data
  };
}

export function deletePostAsync(post) {
  return dispatch => {
    return axios.delete('http://localhost:3000/api/posts', {data: {_id: post._id}})
    .then(response => {
      dispatch(deletePost(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
