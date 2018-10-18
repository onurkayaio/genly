// actions.
import { GET_USER_TUMBLR_POSTS } from "./../actions/index";

// spotify action requirements.
import { getTracks } from "./spotify";

const tumblr_base_url = "https://api.tumblr.com/v2";
const consumer_public_key =
  "NF3QHodm2PoqByjVp4oTOSlV7QwZ9qzeIgnYPsS18j0dtWxZ4c"; // need to hide it.

let limit = 20;
let offset = 0;
let tracks = [];

export function getUserBlogPosts(blogName) {
  let request = getTracksOfPosts(blogName);

  return {
    type: GET_USER_TUMBLR_POSTS,
    payload: request
  };
}

function getTracksOfPosts(blogName) {
  async function getPostsRequest(blogName) {
    let response = await fetch(
      `${tumblr_base_url}/blog/${blogName}/posts/audio?api_key=${consumer_public_key}&limit=${limit}&offset=${offset}`
    );

    let postsData = await response.json();

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

    return tracks;
  }

  return getPostsRequest(blogName);
}
