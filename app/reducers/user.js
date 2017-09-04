import { compineReducers } from 'react-redux'
import { defineState } from 'redux-localstore'
import { SIGN_UP_USER, LOGIN_REQUEST_SUCCESS } from '../constants/index.js'
import { keyBy, mapValues, omit, find } from 'lodash'

const defaultState = {
  auth: {}
}

const initialState = defineState(defaultState)('user')

const user = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        ...state,
       auth: action.payload
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
         ...state,
        auth: action.payload
      };
    default:
      return state;
  }
};

export default user;
