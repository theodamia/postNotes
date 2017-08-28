
import {SIGN_UP_USER, FETCH_USER} from '../constants/index'

export function signUp(data) {
  return {
    type: SIGN_UP_USER,
    payload: data
  };
}

export function fetchUser(data) {
  return {
    type: FETCH_USER,
    payload: data
  };
}
