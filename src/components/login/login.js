import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// helper.
import { parseQueryString, getToken } from "../../helpers";

// enums.
import {
  spotify_client_id,
  spotify_redirect_uri,
  spotify_token_scopes
} from "../../enums";

// css.
import "./login.css";

class Login extends Component {
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
    if (getToken()) return true;
    else this.setToken();
  }

  loggedInStatus() {
    if (getToken()) return true;
    else return false;
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
      <div>
        <div>
          {this.loggedInStatus() ? (
            <div>
              <Redirect to="/dashboard" />
            </div>
          ) : (
            <div className="login-component">
              <h1 className="home-logo">g e n l y</h1>
              <h4>generate a spotify playlist by your blog posts.</h4>
              <div className="home-text">
                <button
                  type="button"
                  className="login-button btn"
                  onClick={this.buttonClick.bind(this)}
                >
                  <i className="fa fa-spotify fa-lg" />
                  Login with Spotify
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
