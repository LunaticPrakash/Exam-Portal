import * as authConstants from "../constants/authConstants";
import authServices from "../services/authServices";

export const register = async (dispatch, user) => {
  dispatch({ type: authConstants.USER_REGISTER_REQUEST });
  const { isRegistered, error } = await authServices.register(user);
  if (isRegistered) {
    return dispatch({
      type: authConstants.USER_REGISTER_SUCCESS,
      payload: isRegistered,
    });
  } else {
    return dispatch({
      type: authConstants.USER_REGISTER_FAILURE,
      payload: error,
    });
  }
};

export const login = async (dispatch, username, password) => {
  dispatch({ type: authConstants.USER_LOGIN_REQUEST });
  const data = await authServices.login(username, password);
  if (data && data.user) {
    return dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data.user,
    });
  } else {
    return dispatch({
      type: authConstants.USER_LOGIN_FAILURE,
      payload: data,
    });
  }
};
