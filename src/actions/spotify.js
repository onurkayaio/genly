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

export function getUserSpotifyProfile() {
  const request = fetch(`${spotify_base_url}/v1/me`, requestParams).then(
    response => response.json()
  );

  return {
    type: GET_USER_SPOTIFY_PROFILE,
    payload: request
  };
}

export function getUserPlaylists() {
  const request = fetch(
    `${spotify_base_url}/v1/me/playlists`,
    requestParams
  ).then(response => response.json());

  return {
    type: GET_USER_SPOTIFY_PLAYLISTS,
    payload: request
  };
}
