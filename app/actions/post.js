import axios from 'axios';
import { omit } from 'lodash';
import * as types from '../constants/index';

export function storePost(data) {
  return {
    type: types.STORE_POST,
    payload: data,
  };
}

export function storePostAsync(post) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/posts', { title: post.title, text: post.text, userID: post.userID })
      .then((response) => {
        dispatch(storePost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updatePostTitle(post) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/posts/:id/title', omit(post))
      .then((response) => {
        dispatch(storePost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updatePostText(post) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/posts/:id/text', omit(post))
      .then((response) => {
        dispatch(storePost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updatePostStatus(post) {
  return (dispatch) => {
    axios.post('http://localhost:3000/api/posts/:id/status', omit(post))
      .then((response) => {
        dispatch(storePost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchAllPost(data) {
  return {
    type: types.FETCH_ALL_POST,
    payload: data,
  };
}

export function fetchAllPostAsync() {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/posts')
      .then((response) => {
        dispatch(fetchAllPost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deletePost(data) {
  return {
    type: types.DELETE_POST,
    payload: data,
  };
}

export function deletePostAsync(post) {
  return (dispatch) => {
    axios.delete('http://localhost:3000/api/posts', { data: { _id: post._id } })
      .then((response) => {
        dispatch(deletePost(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
