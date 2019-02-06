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
        <div className="col-md-3 col-6">
          <div className="box gallery">
            <div className="card">
              <div className="background">
                <img className="card-img-top" src={ value.cover } alt="Card image cap"/>

              </div>
              <a target="_blank"
                 rel="noopener noreferrer"
                 href={ value.playlistId } className="overlay">
              </a>
              <a target="_blank"
                 rel="noopener noreferrer"
                 href={ value.playlistId }>
                <i className="fab fa-spotify"></i>
              </a>
              <a className="thumb" href="#">
                <div className="info">
                  <h2>
                    <a target="_blank"
                       rel="noopener noreferrer"
                       href={ value.playlistId }>
                      { value.blogName }.tumblr.com
                    </a>
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

    return (
      <div className="col-md-12">
        { !isFetched && tracks.length === 0 ? (
          <div className="recent-playlists-container">

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
  console.log(state);
  return {
    spotify: state.spotify,
    tumblr: state.tumblr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getRecentPlaylists }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentPlaylists);
