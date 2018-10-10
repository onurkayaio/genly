import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";

// actions
import { getUserSpotifyProfile } from "../../actions/spotify";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getUserSpotifyProfile();
  }

  loggedInStatus() {
    if (getToken()) return true;
    else return false;
  }

  render() {
    return (
      <div>
        {this.loggedInStatus() ? (
          <div>
            <Header profile={this.props.spotify.profile} />
            <div>
              <Search />
            </div>
          </div>
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
  return {
    spotify: state.spotify
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserSpotifyProfile }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
