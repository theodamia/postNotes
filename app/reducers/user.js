import { compineReducers } from 'react-redux'
import { SIGN_UP_USER, FETCH_USER } from '../constants/index.js'
import { keyBy, mapValues, omit } from 'lodash'

const initialState = {
  collection: {}
};

const user = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        collection: {
          ...state.collection,
          [action.payload._id]: action.payload
        }
      };
    case FETCH_USER:
      return {
        collection: keyBy(action.payload, '_id')
      };
    default:
      return state;
  }
};

export default user;
