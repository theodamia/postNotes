import { compineReducers } from 'react-redux'
import { defineState } from 'redux-localstore'
import * as types from '../constants/index'

const defaultState = {
  auth: {}
}

const initialState = defineState(defaultState)('user')

const user = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.SIGN_UP_USER:
      return {
        ...state,
       auth: action.payload
      };
    case types.LOGIN_REQUEST_SUCCESS:
      return {
         ...state,
        auth: action.payload
      };
    case types.LOG_OUT_REQUEST:
      return {
        //  ...state,
        // auth: action.payload
        auth: action.payload === null
        // return action.payload === null ? initialState : state;
      };
    default:
      return state;
  }
};

export default user;
