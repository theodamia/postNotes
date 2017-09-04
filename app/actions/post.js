import {STORE_POST, FETCH_ALL_POST, DELETE_POST } from '../constants/index'

export function storePost(data) {
  return {
    type: STORE_POST,
    payload: data
  };
}

export function fetchAllPost(data) {
  return {
    type: FETCH_ALL_POST,
    payload: data
  };
}

export function deletePost(data) {
  return {
    type: DELETE_POST,
    payload: data
  }
}
