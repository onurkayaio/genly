import React, { Component } from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

// actions.
import { clearPostsAndErrors } from "../../actions/tumblr";
import { postUserPlaylist } from "../../actions/spotify";

// css.
import "./playlist.css";

// components.
import Track from "../track/track";
import Information from "../information/information";

let audio = new Audio();

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      tracksPerPage: 10,
      playing: false,
      currentTrackId: null
    };

    this.handlePagination = this.handlePagination.bind(this);
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

  handleGeneratePlaylist() {
    this.props.postUserPlaylist("lol", "lol2", false, this.props.tumblr.tracks);
  }

  handleGenerateAnotherPlaylist() {
    this.props.clearPostsAndErrors();
  }

  render() {
    let { tracks, profile } = this.props.tumblr;
    let { currentPage, tracksPerPage, playing, currentTrackId } = this.state;

    const indexOfLastTodo = currentPage * tracksPerPage;
    const indexOfFirstTodo = indexOfLastTodo - tracksPerPage;
    const currentTracks = tracks.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTracks = currentTracks.map(track => {
      return (
        <div key={track.id}>
          <Track
            stopAudio={this.stopAudio}
            playAudio={this.playAudio}
            currentTrackId={currentTrackId}
            playing={playing}
            track={track}
          />
        </div>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tracks.length / tracksPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <a
          key={number}
          id={number}
          className={currentPage === number ? "active" : "inactive"}
          onClick={this.handlePagination}
        >
          {number}
        </a>
      );
    });

    return (
      <div>
        {tracks.length > 0 ? (
          <div className="container">
            <div className="row buttons">
              <div className="col-md-6 generate-another text-center">
                <div className="offset-2 col-md-8">
                  <Information
                    blogProfile={profile}
                    countOfTracks={tracks.length}
                  />
                </div>
              </div>
              <div className="col-md-6 save-playlist text-center">
                <div>
                  <div
                    className="float-left col-md-5 generate-button"
                    onClick={this.handleGenerateAnotherPlaylist}
                  >
                    generate another
                    <div />
                    <i className="fa fa-times" />
                  </div>
                  <div
                    className="float-right col-md-5 save-button"
                    onClick={this.handleGeneratePlaylist}
                  >
                    save playlist
                    <div />
                    <i className="fa fa-check" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginLeft: "15px" }}>
              {renderTracks}
            </div>
          </div>
        ) : null}
        <div className="center">
          <div className="pagination">{renderPageNumbers}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
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
