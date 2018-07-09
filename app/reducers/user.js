import * as types from '../constants/index';

const initialState = {
  auth: {},
};

const user = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case types.SIGN_UP_USER:
      return {
        ...state,
        auth: action.payload,
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        auth: action.payload,
      };
    case types.LOG_OUT_REQUEST:
      return {
        auth: {},
      };
    default:
      return state;
  }
};

export default user;
