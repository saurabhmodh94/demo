import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  USER_LOADING_FAIL
} from "./types";
import axios from "axios";
import { tokenConfig } from "./common";
import cogoToast from "cogo-toast";

export const registerUser = obj => dispatch => {
  const url = `/api/auth/register/`;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body

  const body = JSON.stringify(obj);
  axios
    .post(url, body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      cogoToast.success("REGISTER_SUCCESS");
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });
      cogoToast.error("REGISTER_FAIL");
    });
};

export const loginUser = obj => dispatch => {
  const url = `/api/auth/login/`;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request Body

  const body = JSON.stringify(obj);
  axios
    .post(url, body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      cogoToast.success("LOGIN_SUCCESS");
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });
      cogoToast.error("LOGIN_FAIL");
    });
};

export const logoutUser = () => (dispatch, getState) => {
  const url = `/api/auth/logout/`;
  axios
    .post(url, {}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
      cogoToast.success("LOGOUT_SUCCESS");
    })
    .catch(err => {
      cogoToast.error("LOGOUT_FAIL");
    });
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });
  const url = `/api/auth/user`;
  axios
    .get(url, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      cogoToast.success("USER_LOADED");
    })
    .catch(err => {
      dispatch({
        type: USER_LOADING_FAIL
      });
      cogoToast.error("USER_LOADING_FAIL");
    });
};
