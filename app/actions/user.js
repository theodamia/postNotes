import * as constants from '../constants/index'

export function signUp(data) {
  return {
    type: constants.SIGN_UP_USER,
    payload: data
  };
}

export function logIn(data) {
  return {
    type: constants.LOGIN_REQUEST_SUCCESS,
    payload: data
  };
}

export function logOut() {
  return {
    type: constants.LOG_OUT_REQUEST,
    payload: data
  };
}
