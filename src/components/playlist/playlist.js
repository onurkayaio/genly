import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";

// css.
import "./playlist.css";

// components.
import Track from "../track/track";

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
    console.log("lol");
  }

  handleGenerateAnotherPlaylist() {
    console.log("lol2");
  }

  render() {
    let { tracks } = this.props.tumblr;
    let { currentPage, tracksPerPage, playing, currentTrackId } = this.state;

    const indexOfLastTodo = currentPage * tracksPerPage;
    const indexOfFirstTodo = indexOfLastTodo - tracksPerPage;
    const currentTracks = tracks.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTracks = currentTracks.map(track => {
      return (
        <Track
          stopAudio={this.stopAudio}
          playAudio={this.playAudio}
          currentTrackId={currentTrackId}
          playing={playing}
          track={track}
        />
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
                  save playlistsave playlistsave playlistsave playlistsave
                  playlistsave playlistsave playlistsave playlistsave
                  playlistsave playlist
                </div>
              </div>
              <div className="col-md-6 save-playlist text-center">
                <div>
                  <div
                    class="float-left col-md-5 generate-button"
                    onClick={this.handleGenerateAnotherPlaylist}
                  >
                    generate another
                    <div />
                    <i class="fa fa-times" />
                  </div>
                  <div
                    class="float-right col-md-5 save-button"
                    onClick={this.handleGeneratePlaylist}
                  >
                    save playlist
                    <div />
                    <i class="fa fa-check" />
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
  return {
    tumblr: state.tumblr
  };
}

export default connect(mapStateToProps)(Playlist);
