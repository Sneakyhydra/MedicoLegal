import * as actions from '../types';

// Change state according to the type of action
const authReducer = (state, action) => {
  switch (action.type) {
    case actions.USER_LOADED:
      return {
        ...state,
        user: action.payload,
        token: true,
      };

    case actions.REGISTER_SUCCESS:
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        token: true,
      };

    case actions.REGISTER_FAIL:
    case actions.AUTH_ERROR:
    case actions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
        token: false,
      };

    case actions.LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
        token: false,
      };

    case actions.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case actions.VALID_SUCCESS:
      return {
        ...state,
        token: true,
      };

    case actions.VALID_FAIL:
      return {
        ...state,
        token: false,
      };

    default:
      return state;
  }
};

export default authReducer;
