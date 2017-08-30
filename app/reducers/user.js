import { compineReducers } from 'react-redux'
import { SIGN_UP_USER, LOGIN_REQUEST_SUCCESS } from '../constants/index.js'
import { keyBy, mapValues, omit, find } from 'lodash'

const initialState = {
  auth: {}
};

const user = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        auth: {
          ...state,
          [action.payload._id]: action.payload
        }
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
