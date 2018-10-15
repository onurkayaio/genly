import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUserSpotifyProfile } from "../../actions/spotify";
import { getUserBlogPosts } from "../../actions/tumblr";
import connect from "react-redux/es/connect/connect";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  loggedInStatus() {
    if (getToken()) return true;
    else return false;
  }

  componentWillMount() {
    this.props.getUserSpotifyProfile();
  }

  handleChange(event) {
    if (event.which === 13) {
      this.props.getUserBlogPosts(event.currentTarget.value);
    }
  }

  render() {
    return (
      <div>
        {this.loggedInStatus() ? (
          <div>
            <Header spotify={this.props.spotify} />
            {
              this.props.tumblr.posts.length > 0 ? (
                <p>lol</p>
              ) : (
                <div>
                  <Search onChange={this.handleChange.bind(this)} />
                </div>
              )
            }

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
  console.log(state);
  return {
    spotify: state.spotify,
    tumblr: state.tumblr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserSpotifyProfile, getUserBlogPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
