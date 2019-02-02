/**
 * Spofiy.js holds the actions to get/post data between app and spotify API.
 */
import {
  GET_USER_SPOTIFY_PROFILE,
  GET_USER_SPOTIFY_PROFILE_ERROR,
  POST_USER_SPOTIFY_PLAYLIST,
  POST_USER_SPOTIFY_PLAYLIST_ERROR
} from './index';

import axios from 'axios';
import { getToken } from './../helpers';

const spotify_base_url = 'http://localhost:8080/spotify/';
const token = getToken() ? 'Bearer ' + getToken()['token'] : null; // check the token exists.

export function getUserSpotifyProfile() {
  return dispatch => {
    return axios
      .get(`${ spotify_base_url }/me`, {
        headers: {
          'x-access-token': token ? token : 'Bearer ' + getToken()['token']
        }
      })
      .then(data => {
        dispatch({
          type: GET_USER_SPOTIFY_PROFILE,
          payload: data['data']
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_USER_SPOTIFY_PROFILE_ERROR,
          payload: error.message
        });
      });
  };
}

export function postUserPlaylist(name, description, isPublic, songs, email) {
  return dispatch => {
    generatePlaylist(name, description, isPublic, songs, email).then(data => {
      if ( data['status'] === 200 ) {
        dispatch({
          type: POST_USER_SPOTIFY_PLAYLIST,
          payload: data['data']
        });
      } else {
        dispatch({
          type: POST_USER_SPOTIFY_PLAYLIST_ERROR,
          payload: 'an error occured'
        });
      }
    });
  };
}

function generatePlaylist(name, description, isPublic, songs, email) {
  return axios
    .post(
      `${ spotify_base_url }/playlist?blogName=${ name }&email=${ email }`,
      {
        name: name,
        description: description,
        public: isPublic,
        tracks: songs
      },
      {
        headers: {
          'x-access-token': token ? token : 'Bearer ' + getToken()['token']
        }
      }
    )
    .then(data => {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
}