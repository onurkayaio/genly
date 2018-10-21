import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { postUserPlaylist } from "../../actions/spotify";
import { getUserBlogPosts } from "../../actions/tumblr";
import connect from "react-redux/es/connect/connect";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";
import Playlist from "../../components/playlist/playlist";
import Toaster from "../../components/toaster/toaster";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  handleChange(event) {
    if (event.which === 13) {
      this.props.getUserBlogPosts(event.currentTarget.value);
    }
  }

  render() {
    let { tumblr } = this.props;
    return (
      <div>
        {getToken() ? (
          <div>
            <Header />
            {tumblr.tracks.length > 0 ? (
              <Playlist tracks={tumblr} />
            ) : (
              <div>
                <Search onChange={this.handleChange.bind(this)} />
              </div>
            )}
          </div>
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}

        {tumblr.error ? <Toaster error={tumblr.error} /> : null}

        {tumblr.isFetched ? (
          <div>
            <img alt="loading" src={require("../../images/loading.gif")} />
          </div>
        ) : (
          <div>NOTTTTTTT</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getUserBlogPosts, postUserPlaylist },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
