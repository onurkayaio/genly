import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { parseQueryString } from "../helpers";

// actions
import { testAction } from "../actions";

// enums.
import {
  spotify_client_id,
  spotify_redirect_uri,
  spotify_token_scopes
} from "../enums/index";

class Home extends Component {
  login() {
    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${spotify_client_id}`,
      `&redirect_uri=${spotify_redirect_uri}`,
      `&scope=${spotify_token_scopes}`,
      "&response_type=token",
      "&show_dialog=true"
    ].join("");
  }

  loginCallback() {
    if (this.getToken()) return true;
    else this.setToken();
  }

  loggedInStatus() {
    if (this.getToken()) return true;
    else return false;
  }

  getToken() {
    const tokenObj = JSON.parse(localStorage.getItem("token"));

    // check token isExists and not expired.
    if (
      tokenObj &&
      tokenObj.access_token &&
      new Date() < new Date(tokenObj.expires)
    ) {
      return tokenObj;
    } else return null;
  }

  setToken() {
    if (!window.location.hash.length) return;

    // hashObj => access_token, expires_in, token_type
    const hashObj = parseQueryString(window.location.hash);

    // set local storage.
    localStorage.setItem(
      "token",
      JSON.stringify({
        token: hashObj.access_token,
        expires: new Date(Date.now() + hashObj.expires_in * 1000)
      })
    );

    // clear location hash.
    window.location.hash = "";
  }

  buttonClick(e) {
    e.preventDefault();
    this.login();
  }

  componentWillMount() {
    window.location.hash.length && this.loginCallback();
  }

  render() {
    return (
      <div className="container">
        <div>
          {this.loggedInStatus() ? (
            <div>
              <p>You're logged in to Spotify!</p>
            </div>
          ) : (
            <button
              className="btn btn-md btn-dark"
              onClick={this.buttonClick.bind(this)}
            >
              Log in with Spotify
            </button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    test: state.test
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ testAction }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
