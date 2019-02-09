import axios from 'axios';
import {
  GET_USER_TUMBLR_POSTS,
  GET_USER_TUMBLR_POSTS_CLEAR,
  GET_USER_TUMBLR_POSTS_ERROR,
  GET_USER_TUMBLR_POSTS_ERROR_CLEAR,
  REQUEST_ACTIVE,
  POST_USER_SPOTIFY_PLAYLIST_CLEAR,
  GET_POPULAR_BLOGS
} from './../actions/index';

import { getToken } from './../helpers';

const tumblr_base_url = 'https://genly-226908.appspot.com/tumblr/';
const token = getToken() ? 'Bearer ' + getToken()['token'] : null; // check the token exists.

export function getUserBlogPosts(blogName) {
  return dispatch => {
    dispatch(clearPostsAndErrors());
    dispatch({
      type: REQUEST_ACTIVE,
      payload: true
    });

    getTracksOfPosts(blogName).then(data => {
      if ( data['status'] === 200 ) {
        dispatch({
          type: REQUEST_ACTIVE,
          payload: false
        });
        dispatch({
          type: GET_USER_TUMBLR_POSTS,
          payload: data['data']
        });
      } else {
        dispatch({
          type: REQUEST_ACTIVE,
          payload: false
        });
        dispatch({
          type: GET_USER_TUMBLR_POSTS_ERROR,
          payload: data['data']
        });
      }
    });
  };
}

function getTracksOfPosts(blogName) {
  return axios
    .get(`${ tumblr_base_url }/posts?blogName=${ blogName }`, {
      headers: {
        'x-access-token': token ? token : 'Bearer ' + getToken()['token']
      }
    })
    .then(data => {
      return data['data'];
    })
    .catch(error => {
      return error.response;
    });
}

export function clearPostsAndErrors() {
  return dispatch => {
    dispatch({
      type: GET_USER_TUMBLR_POSTS_CLEAR
    });

    dispatch({
      type: GET_USER_TUMBLR_POSTS_ERROR_CLEAR
    });

    dispatch({
      type: POST_USER_SPOTIFY_PLAYLIST_CLEAR
    });
  };
}

export function getPopularBlogs() {
  return dispatch => {
    axios.get(`${ tumblr_base_url }/blogs/populars`)
      .then(data => {
        dispatch({
          type: GET_POPULAR_BLOGS,
          payload: data['data']
        });
      }).catch(error => {
        return error.response;
      }
    );
  };
}