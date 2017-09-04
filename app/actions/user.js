
import { SIGN_UP_USER, LOGIN_REQUEST_SUCCESS } from '../constants/index'

export function signUp(data) {
  return {
    type: SIGN_UP_USER,
    payload: data
  };
}

export function logIn(data) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: data
  };
}
