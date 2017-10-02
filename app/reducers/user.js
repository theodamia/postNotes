import { compineReducers } from 'react-redux'
import { defineState } from 'redux-localstore'
import * as constants from '../constants/index'
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
    case constants.SIGN_UP_USER:
      return {
        ...state,
       auth: action.payload
      };
    case constants.LOGIN_REQUEST_SUCCESS:
      return {
         ...state,
        auth: action.payload
      };
    case constants.LOG_OUT_REQUEST:
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
