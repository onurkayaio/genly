import React from "react";

function displayTracks(tracks) {
  return tracks.tracks.map(function(track) {
    return (
      <div class="col-md-3">
        <iframe
          src={`https://embed.spotify.com/?uri=${
            track.uri
          }&amp;theme=white&amp;view=coverart`}
          width="100%"
          height="80"
          frameBorder="0"
          allowtransparency="true"
        />
      </div>
    );
  });
}
const Playlist = ({ tracks }) => {
  return (
    <div class="container">
      <div class="row">{displayTracks(tracks)}</div>
    </div>
  );
};

export default Playlist;
