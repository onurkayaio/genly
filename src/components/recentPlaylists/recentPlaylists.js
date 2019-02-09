import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

// css.
import './recentPlaylists.css';

// actions.
import { getRecentPlaylists } from '../../actions/spotify';

class RecentPlaylists extends Component {
  componentDidMount() {
    this.props.getRecentPlaylists();
  }

  renderRecentPlaylists() {
    return this.props.spotify.recentPlaylists.map(function (value) {
      return (
        <div className="col-md-3 col-6" key={ value.playlistId }>
          <div className="box gallery">
            <div className="recent-card">
              <div className="background">
                <img className="card-img-top" src={ value.cover } alt=""/>

              </div>
              <a target="_blank"
                 rel="noopener noreferrer"
                 href={ value.playlistId } className="overlay">
              </a>
              <a target="_blank"
                 rel="noopener noreferrer"
                 href={ value.playlistId }>
                <i className="fab fa-spotify"/>
              </a>
              <a className="thumb" href={ value.playlistId }>
                <div className="info">
                  <h2>
                    { value.blogName }.tumblr.com
                  </h2>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
    }, this);
  }

  render() {
    let { tracks, isFetched } = this.props.tumblr;
    let { playlist } = this.props.spotify;

    return (
      <div className="">
        { !isFetched && playlist.length === 0 ? (
          <div className="recent-playlists-container"
               style={ tracks.length > 0 ? {
                 'marginLeft': '15px',
                 'marginRight': '15px',
                 'marginBottom': '80px'
               } : { 'margin': '80px 15px 80px' } }>
            <h2 className="recent-playlist-header">Recent Playlists</h2>
            <div className="row">
              { this.renderRecentPlaylists() }
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr,
    spotify: state.spotify
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRecentPlaylists }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentPlaylists);
