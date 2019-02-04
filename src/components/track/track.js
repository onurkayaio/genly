import React from 'react';

import ProgressiveImage from 'react-progressive-image-loading';

// css.
import './track.css';

const Track = ({ currentTrackId, playing, track, stopAudio, playAudio }) => {
  return (
    <div className="wrapper">
      <div className="card">
        { track.preview_url ? (
          <div>
            <div>
              { currentTrackId && currentTrackId === track.id && playing ? (
                <div>
                  <div className="overlayer">
                    <i className="fas fa-stop-circle" onClick={ stopAudio }/>
                  </div>
                  <div className="playing-overlayer">
                    <i className="fas fa-volume-up"/>
                  </div>
                </div>
              ) : (
                <div className="overlayer">
                  <i
                    className="fas fa-play-circle"
                    onClick={ () => playAudio(track.preview_url, track.id) }
                  />
                </div>
              ) }
            </div>
          </div>
        ) : null }
        <ProgressiveImage
          preview="https://picsum.photos/458/354?image=0&blur"
          src={ track.album.images[0].url }
          render={ (src, style) => <img alt={ track.artists[0].name } src={ track.album.images[0].url }
                                        style={ style }/> }
        />
        <div className="track-name">
          <p>{ track.name }</p>
        </div>
        <div className="track-artist">
          <p>{ track.artists[0].name }</p>
        </div>
      </div>
    </div>
  );
};

export default Track;
