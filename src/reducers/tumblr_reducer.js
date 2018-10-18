import { GET_USER_TUMBLR_POSTS } from "./../actions/index";

const initialState = {
  tracks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_TUMBLR_POSTS:
      return { ...state, tracks: action.payload };
    default:
      return state;
  }
}
