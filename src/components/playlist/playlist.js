import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

// actions.
import { clearPostsAndErrors } from '../../actions/tumblr';
import { postUserPlaylist } from '../../actions/spotify';

// css.
import './playlist.css';

// components.
import Track from '../track/track';
import Success from '../success/success';
import Footer from '../footer/footer';
import Pagination from '../pagination/pagination';

let audio = new Audio();

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      tracksPerPage: 12,
      playing: false,
      currentTrackId: null
    };

    this.handlePagination = this.handlePagination.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
    this.handleGeneratePlaylist = this.handleGeneratePlaylist.bind(this);
    this.handleGenerateAnotherPlaylist = this.handleGenerateAnotherPlaylist.bind(
      this
    );
  }

  playAudio(previewUrl, trackId) {
    audio.src = previewUrl;

    this.setState({
      playing: true,
      currentTrackId: trackId
    });

    audio.play();
  }

  stopAudio() {
    this.setState({
      playing: false,
      currentTrackId: null
    });

    audio.pause();
  }

  handlePagination(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  }

  previousPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    });
  }

  handleGeneratePlaylist() {
    this.props.postUserPlaylist(
      this.props.tumblr.profile.name + ' | genly',
      'generated by genly.',
      false,
      this.props.tumblr.tracks,
      this.props.spotify.profile.email
    );
  }

  handleGenerateAnotherPlaylist() {
    this.props.clearPostsAndErrors();
  }

  render() {
    let { tracks, profile } = this.props.tumblr;
    let { playlist } = this.props.spotify;
    let { currentPage, tracksPerPage, playing, currentTrackId } = this.state;

    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = tracks.slice(indexOfFirstTrack, indexOfLastTrack);

    const renderTracks = currentTracks.map(track => {
      return (
        <div
          className="col-md-2 col-6"
          key={ track.id + track.uri }
        >
          <Track
            stopAudio={ this.stopAudio }
            playAudio={ this.playAudio }
            currentTrackId={ currentTrackId }
            playing={ playing }
            track={ track }
          />
        </div>
      );
    });

    const countOfPage = Math.ceil(tracks.length / tracksPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= countOfPage; i++) {
      pageNumbers.push(i);
    }

    let availablePages = [];

    let start = 1;
    let end = 10;

    if ( countOfPage > 10 ) {
      start = Math.max(1, (currentPage - 4));
      end = Math.min(countOfPage, (currentPage + 5));

      if ( start === 1 ) {
        end = 10;
      } else if ( end === countOfPage ) {
        start = (countOfPage - 9);
      }
    }

    for (let i = start; i <= end; i++) {
      availablePages.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if ( availablePages.indexOf(number) > -1 ) {
        return (
          <Pagination
            key={ number }
            number={ number }
            currentPage={ currentPage }
            handlePagination={ this.handlePagination }
          />
        );
      } else
        return null;
    });

    return (
      <div>
        { tracks.length > 0 && !playlist['data'] ? (
          <div className="container">
            <div className="info-container">
              <div className="row buttons">
                <div className="col-md-6 ">
                  <table className="playlist-info">
                    <tbody>
                    <tr>
                      <td><i className="fab playlist-info-tumblr-icon fa-tumblr"
                             style={ { 'paddingRight': '5px' } }/> blog:
                      </td>
                      <td className="float-right">{ profile.name }.tumblr.com</td>
                    </tr>
                    <tr>
                      <td><i className="fas fa-sort-amount-up" style={ { 'paddingRight': '5px' } }/>track count</td>
                      <td className="float-right">{ tracks.length }</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6 process-buttons text-center">
                  <div>
                    <button
                      onClick={ this.handleGenerateAnotherPlaylist }
                      className="process-button offset"
                    >
                      generate
                      another
                    </button>
                    <button
                      onClick={ this.handleGeneratePlaylist }
                      className="orange-button offset "
                    >
                      save playlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              { renderTracks }
            </div>

            <div className="center">
              <div className="pagination">
                <button className="btn" onClick={ currentPage <= 1 ? null : this.previousPage }>
                  <i className="fas fa-angle-left"/>
                </button>
                { renderPageNumbers }
                <button className="btn" onClick={ currentPage >= countOfPage ? null : this.nextPage }>
                  <i className="fas fa-angle-right"/>
                </button>
              </div>
            </div>
          </div>
        ) : null }
        <Success/>

        <Footer isFixed={ false }/>


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
  return bindActionCreators(
    { clearPostsAndErrors, postUserPlaylist },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
