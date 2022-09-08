import * as authConstants from "../constants/authConstants";

const registerInitialState = {
  loading: false,
  error: null,
  isRegsitered: false,
};

export function registerReducer(state = registerInitialState, action) {
  switch (action.type) {
    case authConstants.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authConstants.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegsitered: true,
      };

    case authConstants.USER_REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

const user = localStorage.getItem("user");
const loginInitialState = {
  loading: false,
  error: null,
  loggedIn: user ? true : false,
  user: JSON.parse(user),
};

export function loginReducer(state = loginInitialState, action) {
  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false,
      };

    case authConstants.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload,
      };

    case authConstants.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload,
      };

    case authConstants.USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
