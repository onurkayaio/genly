import { GET_USER_SPOTIFY_PROFILE, POST_USER_SPOTIFY_PLAYLIST } from "./index";

// helper.
import { getToken } from "./../helpers";

const spotify_base_url = "https://api.spotify.com/v1";

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

  const request = fetch(`${spotify_base_url}/me`, requestParams).then(
    response => response.json()
  );

  return {
    type: GET_USER_SPOTIFY_PROFILE,
    payload: request
  };
}

export function postUserPlaylist(name, description, isPublic) {
  if (requestParams.headers.Authorization === null) {
    checkTokenExists();
  }

  const request = fetch(`${spotify_base_url}/playlists`, {
    method: "POST",
    headers: requestParams.headers,
    body: JSON.stringify({
      name: name,
      description: description,
      public: isPublic
    })
  }).then(response => response.json());

  return {
    type: POST_USER_SPOTIFY_PLAYLIST,
    payload: request
  };
}

export function getTracks(trackIds) {
  if (requestParams.headers.Authorization === null) {
    checkTokenExists();
  }

  const request = fetch(
    `${spotify_base_url}/tracks?ids=${trackIds}`,
    requestParams
  ).then(response => response.json());

  return request;
}
