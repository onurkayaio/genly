import { GET_USER_SPOTIFY_PROFILE, POST_USER_SPOTIFY_PLAYLIST } from "./index";

import axios from "axios";

// helper.
import { getToken } from "./../helpers";

const spotify_base_url = "https://api.spotify.com/v1";

// get token.
const token = getToken() ? "Bearer " + getToken()["token"] : null;

const requestParams = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  }
};

export function getUserSpotifyProfile() {
  return dispatch => {
    dispatch({
      type: GET_USER_SPOTIFY_PROFILE
    });

    return axios
      .get(`${spotify_base_url}/me`, { headers: { Authorization: token } })
      .then(data => {
        dispatch({
          type: GET_USER_SPOTIFY_PROFILE
        });
        dispatch(setPokemons(data));
      })
      .catch(function(error) {
        dispatch({
          type: GET_USER_SPOTIFY_PROFILE,
          payload: error.message
        });
      });
  };
}

function setPokemons(data) {
  return {
    type: GET_USER_SPOTIFY_PROFILE,
    payload: data["data"]
  };
}

export function postUserPlaylist(name, description, isPublic) {
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
  const request = fetch(
    `${spotify_base_url}/tracks?ids=${trackIds}`,
    requestParams
  ).then(response => response.json());

  return request;
}
