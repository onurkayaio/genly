import React from "react";

function displayTracks(tracks) {
  return tracks.tracks.map(function(track) {
    return (
      <div key={track.id} classname-="col-md-4">
        <iframe
          title={tracks.name}
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
    <div className="container">
      <div className="row">{displayTracks(tracks)}</div>
    </div>
  );
};

export default Playlist;
