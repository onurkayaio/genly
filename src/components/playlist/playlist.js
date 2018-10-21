import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";

import "./playlist.css";

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      tracksPerPage: 6
    };

    this.handlePagination = this.handlePagination.bind(this);
  }


  handlePagination(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    let { tracks } = this.props.tumblr;
    let { currentPage, tracksPerPage } = this.state;

    const indexOfLastTodo = currentPage * tracksPerPage;
    const indexOfFirstTodo = indexOfLastTodo - tracksPerPage;
    const currentTracks = tracks.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTracks = currentTracks.map(function (track) {
      return (
        <div key={track.id} classname-="col-md-4">
          <iframe
            title={tracks.name}
            src={`https://embed.spotify.com/?uri=${track.uri}&amp;theme=white&amp;view=coverart`}
            width="100%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
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
        {
          tracks.length > 0 ?
            (
              <div className="container">
                <div className="row">
                  {renderTracks}
                </div>
                <div className="center">
                  <div className="pagination">
                    {renderPageNumbers}
                  </div>
                </div>
              </div>
            ) : null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr
  };
}

export default connect(
  mapStateToProps,
)(Playlist);
