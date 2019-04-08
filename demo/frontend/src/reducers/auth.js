import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  USER_LOADING_FAIL
} from "../actions/types"; //modify

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: null,
  isAuth: null,
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuth: true,
        isLoading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case USER_LOADING_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuth: false,
        isLoading: false
      };
    default:
      return state;
  }
}
