import { GET_USER_SPOTIFY_PROFILE, GET_USER_SPOTIFY_PLAYLISTS } from "./index";

// helper.
import { getToken } from "./../helpers";

const spotify_base_url = "https://api.spotify.com";

// get token.
const token = getToken() ? "Bearer " + getToken()["token"] : null;

const requestParams = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  }
};

function checkTokenExists() {
  requestParams.headers.Authorization = getToken()
    ? "Bearer " + getToken()["token"]
    : null;
}

export function getUserSpotifyProfile() {
  // TODO: burayı yeniden gözden geçir.
  if (requestParams.headers.Authorization === null) {
    checkTokenExists();
  }

  const request = fetch(`${spotify_base_url}/v1/me`, requestParams).then(
    response => response.json()
  );

  return {
    type: GET_USER_SPOTIFY_PROFILE,
    payload: request
  };
}

export function getUserPlaylists() {
  if (requestParams.headers.Authorization === null) {
    checkTokenExists();
  }

  const request = fetch(
    `${spotify_base_url}/v1/me/playlists`,
    requestParams
  ).then(response => response.json());

  return {
    type: GET_USER_SPOTIFY_PLAYLISTS,
    payload: request
  };
}
