import axios from "axios";
import {
  GET_USER_TUMBLR_POSTS,
  GET_USER_TUMBLR_POSTS_CLEAR,
  GET_USER_TUMBLR_POSTS_ERROR,
  GET_USER_TUMBLR_POSTS_ERROR_CLEAR
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

    getTracksOfPosts(blogName).then(data => {
      if (data["status"] === 200) {
        dispatch({
          type: GET_USER_TUMBLR_POSTS,
          payload: data["tracks"]
        });
      } else {
        dispatch({
          type: GET_USER_TUMBLR_POSTS_ERROR,
          payload: data["message"]
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

    let postsData = await response;

    if (postsData["data"] && postsData["data"]["meta"]["status"] === 404) {
      return {
        message: postsData["data"]["meta"]["msg"],
        status: 404
      };
    }

    let tracksData = await getTracks(
      postsData["response"]["posts"]
        .filter(post => post["audio_type"] === "spotify")
        .map(
          post =>
            post["audio_source_url"].split("https://open.spotify.com/track/")[1]
        )
        .join(",")
    );

    tracks = tracks.concat(tracksData["tracks"]);

    if (postsData["response"]["posts"].length === 20) {
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
