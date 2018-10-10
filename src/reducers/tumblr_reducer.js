import { GET_USER_TUMBLR_POSTS } from "./../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_TUMBLR_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
}
