import {
  GET_USER_SPOTIFY_PROFILE,
  GET_USER_SPOTIFY_PLAYLISTS
} from "./../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_USER_SPOTIFY_PROFILE:
      return { ...state, profile: action.payload };
    case GET_USER_SPOTIFY_PLAYLISTS:
      return { ...state, playlists: action.payload };
    default:
      return state;
  }
}
