import * as types from '../actions/ActionTypes';

const initialState = {
  currentUser: null,
  isLoggingIn: false,
  isLoggedIn: false,
  isJoining: false,
  isJoined: false,
  error: null
}

export default function authentication(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch(action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        currentUser: action.currentUser
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        error: action.error
      };

    case types.JOIN_REQUEST:
      return {
        ...state,
        isJoining: true
      };
    case types.JOIN_SUCCESS:
      return {
        ...state,
        isJoining: false,
        isJoined: true
      };
    case types.JOIN_FAILURE:
      return {
        ...state,
        isJoining: false,
        error: action.error
      };

    case types.GET_STATUS_REQUEST:
      return {
        ...state,
        isLoggedIn: true
      };
    case types.GET_STATUS_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case types.GET_STATUS_FAILURE:
      return {
        ...state,
        isLoggedIn: false
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null
      }

    default:
      return state;
  }
}
