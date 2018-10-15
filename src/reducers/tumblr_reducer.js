import { GET_USER_TUMBLR_POSTS } from "./../actions/index";

const initialState = {
  posts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_TUMBLR_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
}
