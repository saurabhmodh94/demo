import { GET_TWEETS, DELETE_TWEET, ADD_TWEET } from "./types";
import axios from "axios";
import { tokenConfig } from "./common";
import cogoToast from "cogo-toast";

export const getTweets = () => (dispatch, getState) => {
  const url = "/api/tweets/";
  axios
    .get(url, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TWEETS,
        payload: res.data
      });
      cogoToast.success("GET_TWEETS");
    })
    .catch(err => cogoToast.error("GET_TWEETS"));
};

export const deleteTweet = id => (dispatch, getState) => {
  const url = `/api/tweet/${id}`;
  axios
    .delete(url, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_TWEET,
        payload: id
      });
      cogoToast.success("DELETE_TWEET");
    })
    .catch(err => cogoToast.error("DELETE_TWEET"));
};

export const addTweet = obj => (dispatch, getState) => {
  const url = `/api/tweets/`;
  const body = JSON.stringify(obj);

  axios
    .post(url, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_TWEET,
        payload: res.data
      });
      cogoToast.success("ADD_TWEET");
    })
    .catch(err => cogoToast.error("ADD_TWEET"));
};
