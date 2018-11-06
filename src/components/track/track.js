import React from "react";

// css.
import "./track.css";

const Track = ({ currentTrackId, playing, track, stopAudio, playAudio }) => {
  console.log(track.id);
  return (
    <div key={track.id} className="wrapper">
      <div className="card">
        {track.preview_url ? (
          <div className="overlayer">
            <div>
              {currentTrackId && currentTrackId === track.id && playing ? (
                <i className="fas fa-stop-circle" onClick={stopAudio} />
              ) : (
                <i
                  className="fas fa-play-circle"
                  onClick={() => playAudio(track.preview_url, track.id)}
                />
              )}
            </div>
          </div>
        ) : null}
        <img src={track.album.images[0].url} alt="" />
        <div className="track-name">
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default Track;
