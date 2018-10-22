import React from "react";

// css.
import "./track.css";

const Track = ({ currentTrackId, playing, track, stopAudio, playAudio }) => {
  return (
    <div key={track.id} className="wrapper">
      <div className="cards">
        <div className="card">
          <div className="overlayer">
            {track.preview_url ? (
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
            ) : null}
          </div>
          <img src={track.album.images[0].url} alt="" />
          <div className="track-name">
            <p>{track.name}</p>
            <p>{track.artists[0].name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
