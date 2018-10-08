import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// components.
import Search from "../../components/search/search";

// actions
import { getUserSpotifyProfile, getUserPlaylists } from "../../actions/spotify";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserSpotifyProfile();
    this.props.getUserPlaylists();
  }

  loggedInStatus() {
    if (getToken()) return true;
    else return false;
  }

  render() {
    return (
      <div>
        {this.loggedInStatus() ? (
          <Search />
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    user_profile: state.profile,
    playlists: state.playlists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getUserSpotifyProfile, getUserPlaylists },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
