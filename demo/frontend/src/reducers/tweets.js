import { GET_TWEETS, DELETE_TWEET, ADD_TWEET } from "../actions/types"; //modify

const initialState = {
  tweets: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TWEETS:
      return {
        ...state,
        tweets: action.payload
      };
    case DELETE_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter(tweet => tweet.id != action.payload)
      };
    case ADD_TWEET:
      return {
        ...state,
        tweets: [...state.tweets, action.payload]
      };
    default:
      return state;
  }
}
