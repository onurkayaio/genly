import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";

import "./success.css";
import { bindActionCreators } from "redux";
import { clearPostsAndErrors } from "../../actions/tumblr";

class Success extends Component {
  handleGenerateAnotherPlaylist() {
    this.props.clearPostsAndErrors();
  }

  render() {
    let { playlist } = this.props.spotify;

    return (
      <div>
        {playlist["snapshot_id"] ? (
          <div className="child">
            <h5>
              Your playlist has been generated.
            </h5>

            <div
              className="float-left col-md-5 generate-button"
              onClick={this.handleGenerateAnotherPlaylist.bind(this)}
            >
              generate another
              <div />
              <i className="fa fa-times" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { clearPostsAndErrors },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Success);
