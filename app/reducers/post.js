import { compineReducers } from 'react-redux'
import * as types from '../constants/index.js'
import { keyBy, omit, filter, includes, lowerCase } from 'lodash'

const initialState = {
  collection: {}
};

const post = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.STORE_POST:
      return {
        collection: {
          ...state.collection,
          [action.payload._id]: action.payload
        }
      };
    case types.FETCH_ALL_POST:
      return {
        collection: keyBy(action.payload, '_id')
      };
    case types.DELETE_POST:
      return {
        collection: omit(state.collection, action.payload._id)
      };
    default:
      return state;
  }
};

export default post;
