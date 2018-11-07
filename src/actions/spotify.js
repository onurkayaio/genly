/**
 * Spofiy.js holds the actions to get/post data between app and spotify API.
 */
import {
  GET_USER_SPOTIFY_PROFILE,
  GET_USER_SPOTIFY_PROFILE_ERROR,
  POST_USER_SPOTIFY_PLAYLIST
} from "./index";

import axios from "axios";
import { getToken } from "./../helpers";

const spotify_base_url = "https://api.spotify.com/v1";
const token = getToken() ? "Bearer " + getToken()["token"] : null; // check the token exists.

export function getUserSpotifyProfile() {
  return dispatch => {
    return axios
      .get(`${spotify_base_url}/me`, {
        headers: {
          Authorization: token ? token : "Bearer " + getToken()["token"]
        }
      })
      .then(data => {
        dispatch({
          type: GET_USER_SPOTIFY_PROFILE,
          payload: data["data"]
        });
      })
      .catch(function(error) {
        dispatch({
          type: GET_USER_SPOTIFY_PROFILE_ERROR,
          payload: error.message
        });
      });
  };
}

export function postUserPlaylist(name, description, isPublic, songs) {
  return dispatch => {
    generatePlaylist(name, description, isPublic, songs).then(data => {
      dispatch({
        type: POST_USER_SPOTIFY_PLAYLIST,
        payload: data['data']
      });
    });
  };
}

async function generatePlaylist(name, description, isPublic, songs) {
  return axios
    .post(
      `${spotify_base_url}/me/playlists`,
      JSON.stringify({
        name: name,
        description: description,
        public: isPublic
      }),
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(data => {
      let songUrls = songs.map(song => song["uri"]).join(",");

      axios.post(
        `${spotify_base_url}/playlists/${
          data["data"]["id"]
        }/tracks/?position=0&uris=${songUrls}`,
        null,
        {
          headers: {
            Authorization: token
          }
        }
      );
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function getTracks(trackIds) {
  return axios
    .get(`${spotify_base_url}/tracks?ids=${trackIds}`, {
      headers: {
        Authorization: token ? token : "Bearer " + getToken()["token"]
      }
    })
    .then(data => {
      return data["data"];
    })
    .catch(function(error) {
      console.log(error);
    });
}
