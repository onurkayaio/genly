import {
  GET_USER_SPOTIFY_PROFILE,
  GET_USER_SPOTIFY_PLAYLISTS
} from "./../actions/index";

const initialState = {
  profile: null,
  playlist: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_SPOTIFY_PROFILE:
      return { ...state, profile: action.payload };
    case GET_USER_SPOTIFY_PLAYLISTS:
      return { ...state, playlist: action.payload };
    default:
      return state;
  }
}
