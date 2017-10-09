import * as types from '../constants/index'

export function signUp(data) {
  return {
    type: types.SIGN_UP_USER,
    payload: data
  };
}

export function logIn(data) {
  return {
    type: types.LOGIN_REQUEST_SUCCESS,
    payload: data
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT_REQUEST,
    payload: data
  };
}
