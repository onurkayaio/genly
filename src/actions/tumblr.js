// actions.
import { GET_USER_TUMBLR_POSTS } from "./../actions/index";

const tumblr_base_url = "https://api.tumblr.com/v2";
const consumer_public_key =
  "NF3QHodm2PoqByjVp4oTOSlV7QwZ9qzeIgnYPsS18j0dtWxZ4c"; // need to hide it.

var limit = 20;
var offset = 0;
var posts = [];

export function getUserBlogPosts(blogName) {
  var request = getPosts(blogName);

  return {
    type: GET_USER_TUMBLR_POSTS,
    payload: request
  };
}

function getPosts(blogName) {
  async function getPostsRequest(blogName) {
    var response = await fetch(
      `${tumblr_base_url}/blog/${blogName}/posts/audio?api_key=${consumer_public_key}&limit=${limit}&offset=${offset}`
    );

    var postsData = await response.json();

    if (postsData['meta']['status'] === 200) {
      
    }
    
    posts = posts.concat(postsData["response"]["posts"]);

    if (postsData["response"]["posts"].length === 20) {
      offset = offset + limit;
      await getPosts(blogName);
    } else {
      return posts;
    }

    return posts;
  }

  return getPostsRequest(blogName);
}
