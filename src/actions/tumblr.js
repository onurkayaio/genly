import axios from "axios";
import {
  GET_USER_TUMBLR_POSTS,
  GET_USER_TUMBLR_POSTS_CLEAR,
  GET_USER_TUMBLR_POSTS_ERROR,
  GET_USER_TUMBLR_POSTS_ERROR_CLEAR,
  REQUEST_ACTIVE
} from "./../actions/index";
import { getTracks } from "./spotify";

const tumblr_base_url = "https://api.tumblr.com/v2";
const consumer_public_key = process.env.REACT_APP_TUMBLR_CONSUMER_PUBLIC_KEY;

let limit = 20;
let offset = 0;
let tracks = [];

export function getUserBlogPosts(blogName) {
  return dispatch => {
    dispatch(clearPostsAndErrors());
    dispatch({
      type: REQUEST_ACTIVE,
      payload: true
    });

    getTracksOfPosts(blogName).then(data => {
      if (data["status"] === 200) {
        dispatch({
          type: GET_USER_TUMBLR_POSTS,
          payload: data["tracks"]
        });

        dispatch({
          type: REQUEST_ACTIVE,
          payload: false
        });
      } else {
        dispatch({
          type: GET_USER_TUMBLR_POSTS_ERROR,
          payload: data["message"]
        });
        dispatch({
          type: REQUEST_ACTIVE,
          payload: false
        });
      }
    });
  };
}

function getTracksOfPosts(blogName) {
  async function getPostsRequest(blogName) {
    let response = await axios
      .get(
        `${tumblr_base_url}/blog/${blogName}/posts/audio?api_key=${consumer_public_key}&limit=${limit}&offset=${offset}`
      )
      .then(data => {
        return data["data"];
      })
      .catch(error => {
        return error.response;
      });

    // get response as json.
    let responseData = await response;

    // if blog is not found return error.
    if (
      responseData["data"] &&
      responseData["data"]["meta"]["status"] === 404
    ) {
      return {
        message: "Blog not found.",
        status: 404
      };
    }

    let spotifyPosts = responseData["response"]["posts"]
      .filter(post => post["audio_type"] === "spotify")
      .map(
        post =>
          post["audio_source_url"].split("https://open.spotify.com/track/")[1]
      )
      .join(",");

    if (!spotifyPosts) {
      return {
        message: "Not found spotify audio post.",
        status: 404
      };
    }

    // get spotify tracks by responseData.
    let spotifyPostsData = await getTracks(spotifyPosts);

    // if there is not spotify tracks response error.
    if (!spotifyPostsData["tracks"]) {
      return {
        message: "Not found audio post.",
        status: 404
      };
    }

    // merge tracks.
    tracks = tracks.concat(spotifyPostsData["tracks"]);

    // get paginated tracks by recursive.
    if (responseData["response"]["posts"].length === 20) {
      offset = offset + limit;
      await getTracksOfPosts(blogName);
    }

    let data = {
      tracks: tracks,
      status: 200
    };

    return data;
  }

  return getPostsRequest(blogName);
}

function clearPostsAndErrors() {
  return dispatch => {
    dispatch({
      type: GET_USER_TUMBLR_POSTS_CLEAR
    });

    dispatch({
      type: GET_USER_TUMBLR_POSTS_ERROR_CLEAR
    });
  };
}
