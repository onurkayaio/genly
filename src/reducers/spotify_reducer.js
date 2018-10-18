import {
  GET_USER_SPOTIFY_PROFILE,
  GET_USER_SPOTIFY_PROFILE_CLEAR,
  GET_USER_SPOTIFY_PROFILE_ERROR,
  GET_USER_SPOTIFY_PROFILE_ERROR_CLEAR,
  POST_USER_SPOTIFY_PLAYLIST,
  POST_USER_SPOTIFY_PLAYLIST_CLEAR,
  POST_USER_SPOTIFY_PLAYLIST_ERROR,
  POST_USER_SPOTIFY_PLAYLIST_ERROR_CLEAR
} from "./../actions/index";

const initialState = {
  profile: null,
  playlist: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SPOTIFY_PROFILE:
      return { ...state, profile: action.payload };
    case GET_USER_SPOTIFY_PROFILE_CLEAR:
      return { ...state, error: null };
    case GET_USER_SPOTIFY_PROFILE_ERROR:
      return { ...state, error: action.payload };
    case GET_USER_SPOTIFY_PROFILE_ERROR_CLEAR:
      return { ...state, error: null };
    case POST_USER_SPOTIFY_PLAYLIST:
      return { ...state, playlist: action.payload };
    case POST_USER_SPOTIFY_PLAYLIST_CLEAR:
      return { ...state, error: [] };
    case POST_USER_SPOTIFY_PLAYLIST_ERROR:
      return { ...state, error: action.payload };
    case POST_USER_SPOTIFY_PLAYLIST_ERROR_CLEAR:
      return { ...state, error: null };
    default:
      return state;
  }
}
