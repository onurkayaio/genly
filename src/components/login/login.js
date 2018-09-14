import React, { Component } from "react";

import { parseQueryString } from "../../helpers";

// enums.
import {
  spotify_client_id,
  spotify_redirect_uri,
  spotify_token_scopes
} from "../../enums";

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
    if (tokenObj && tokenObj.token && new Date() < new Date(tokenObj.expires)) {
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
      <div className="login-component">
        <div>
          {this.loggedInStatus() ? (
            <div>
              <p>You're logged in to Spotify!</p>
            </div>
          ) : (
            <div>
              <h1>g e n l y</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <button
                type="button"
                className="login-button btn btn-dark"
                onClick={this.buttonClick.bind(this)}
              >
                <i class="fa fa-spotify fa-lg" />
                Login with Spotify
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
