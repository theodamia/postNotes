import * as types from '../constants/index'

export function storePost(data) {
  return {
    type: types.STORE_POST,
    payload: data
  };
}

export function fetchAllPost(data) {
  return {
    type: types.FETCH_ALL_POST,
    payload: data
  };
}

export function deletePost(data) {
  return {
    type: types.DELETE_POST,
    payload: data
  }
}
