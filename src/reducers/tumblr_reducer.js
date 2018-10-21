import {
  GET_USER_TUMBLR_POSTS,
  GET_USER_TUMBLR_POSTS_CLEAR,
  GET_USER_TUMBLR_POSTS_ERROR,
  GET_USER_TUMBLR_POSTS_ERROR_CLEAR,
  REQUEST_ACTIVE
} from "./../actions/index";

const initialState = {
  isFetched: false,
  tracks: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_TUMBLR_POSTS:
      return { ...state, tracks: action.payload };
    case GET_USER_TUMBLR_POSTS_CLEAR:
      return { ...state, tracks: [] };
    case GET_USER_TUMBLR_POSTS_ERROR:
      return { ...state, error: action.payload };
    case GET_USER_TUMBLR_POSTS_ERROR_CLEAR:
      return { ...state, error: null };
    case REQUEST_ACTIVE:
      return { ...state, isFetched: action.payload };
    default:
      return state;
  }
}
