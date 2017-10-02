import { compineReducers } from 'react-redux'
import { STORE_POST, FETCH_ALL_POST, DELETE_POST } from '../constants/index.js'
import { keyBy, omit } from 'lodash'

const initialState = {
  collection: {}
};

const post = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case STORE_POST:
      return {
        collection: {
          ...state.collection,
          [action.payload._id]: action.payload
        }
      };
    case FETCH_ALL_POST:
      return {
        collection: keyBy(action.payload, '_id')
      };
    case DELETE_POST:
      return {
        collection: omit(state.collection, action.payload._id)
      };
    default:
      return state;
  }
};

export default post;
