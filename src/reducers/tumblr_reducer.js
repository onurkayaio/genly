import {
  GET_USER_TUMBLR_POSTS,
  EMPTY_USER_TUMBLR_POSTS
} from "./../actions/index";

const initialState = {
  tracks: [],
  error: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_TUMBLR_POSTS:
      return { ...state, tracks: action.payload };
    case EMPTY_USER_TUMBLR_POSTS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
