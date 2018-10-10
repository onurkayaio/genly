const tumblr_base_url = "https://api.tumblr.com/v2";
const consumer_public_key =
  "NF3QHodm2PoqByjVp4oTOSlV7QwZ9qzeIgnYPsS18j0dtWxZ4c";

export function getUserSpotifyProfile() {
  // TODO: burayı yeniden gözden geçir.
  if (requestParams.headers.Authorization === null) {
    checkTokenExists();
  }

  const request = fetch(
    `${tumblr_base_url}/blog/good.tumblr.com/info`,
    requestParams
  ).then(response => response.json());

  return {
    type: GET_USER_SPOTIFY_PROFILE,
    payload: request
  };
}
