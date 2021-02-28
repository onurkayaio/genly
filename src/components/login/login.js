import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// helper.
import { parseQueryString, getToken } from '../../helpers';

// enums.
import { spotify_token_scopes } from '../../enums';

// css.
import './login.css';

const spotify_client_id = process.env.REACT_APP_SPOTIFY_PUBLIC_CLIENT_ID;
const spotify_redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const spotify_base_url = process.env.REACT_APP_SPOTIFY_BASE_URL;

const token = getToken() ? 'Bearer ' + getToken()['token'] : null; // check the token exists.

class Login extends Component {
  login() {
    window.location = [
      'https://accounts.spotify.com/authorize',
      `?client_id=${ spotify_client_id }`,
      `&redirect_uri=https://www.genly.in`,
      `&scope=${ spotify_token_scopes }`,
      '&response_type=token',
      '&show_dialog=true'
    ].join('');
  }

  loginCallback() {
    if ( getToken() ) return true;
    else this.setToken();
  }

  loggedInStatus() {
    if ( getToken() ) return true;
    else return false;
  }

  setToken() {
    if ( !window.location.hash.length ) return;

    // hashObj => access_token, expires_in, token_type
    const hashObj = parseQueryString(window.location.hash);

    // set local storage.
    localStorage.setItem(
      'token',
      JSON.stringify({
        token: hashObj.access_token,
        expires: new Date(Date.now() + hashObj.expires_in * 1000)
      })
    );

    axios
      .get(`${ spotify_base_url }/login`, {
        headers: {
          'x-access-token': token ? token : 'Bearer ' + getToken()['token']
        }
      });

    // clear location hash.
    window.location.hash = '';
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
        <div className="login-container">
          { this.loggedInStatus() ? (
            <div>
              <Redirect to="/dashboard"/>
            </div>
          ) : (
            <div>
              <div className="more-about">
                <ul>
                  <li>
                    <NavLink to='/privacy'>
                      Privacy
                    </NavLink>
                  </li>
                  {/*|
                  <li>
                    <NavLink to='/feedback'>
                      Feedback
                    </NavLink>
                  </li>*/ }
                </ul>
              </div>
              <div className="parent">
                <div>
                  <img
                    alt=""
                    src={ require('../../images/logo.png') }
                    className="homepage-image"
                  />
                </div>
                <div className="homepage-info">
                  genly generates spotify playlists based on tumblr blogs.
                </div>
                <div className="homepage-button">
                  <button
                    type="button"
                    className="login-button btn"
                    onClick={ this.buttonClick.bind(this) }
                  >
                    <i className="fab fa-spotify fa-lg"/>
                    Login with Spotify
                  </button>
                  <p className="no-spotify-span">

                    no spotify yet? click <a
                    href="https://www.spotify.com/tr/signup/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >here.
                  </a>
                  </p>
                </div>
              </div>
              <div className='made-with-love'>
                made with <span className="love">♥</span> by <a href="https://www.linkedin.com/in/onurkayaio/"
                                                                target="_blank"
                                                                rel="noopener noreferrer">onur kaya.</a>
              </div>
            </div>
          ) }
        </div>
      </div>
    );
  }
}

export default Login;
