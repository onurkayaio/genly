import {
  GET_USER_SPOTIFY_PROFILE,
  POST_USER_SPOTIFY_PLAYLIST
} from "./../actions/index";

const initialState = {
  profile: null,
  playlist: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_SPOTIFY_PROFILE:
      return { ...state, profile: action.payload };
    case POST_USER_SPOTIFY_PLAYLIST:
      return { ...state, playlist: action.payload };
    default:
      return state;
  }
}
