import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

// actions.
import { getUserSpotifyProfile } from '../../actions/spotify';
import { clearPostsAndErrors } from '../../actions/tumblr';

// helper
import { deleteToken } from '../../helpers';

// css.
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.clearData = this.clearData.bind(this);
  }

  componentDidMount() {
    this.props.getUserSpotifyProfile();
  }

  clearData() {
    this.props.clearPostsAndErrors();
  }

  logout() {
    deleteToken();
  }

  render() {
    let { spotify } = this.props;

    return (
      <div>
        <header className="header">
          <div className="logo">
            <img onClick={ this.clearData } alt="" src={ require('../../images/logo.png') }/>
          </div>
          <div className="login">
            <div className="login-left">
              <div className="user-name">{ `${
                spotify.profile ? spotify.profile.display_name : null
                }` }</div>
              <div className="logout">
                {/*<a href="/logout" className="logout-url" style={ { 'marginRight': '5px' } }>
                  Share
                </a>
                |*/ }
                <Link onClick={ this.logout } className="logout-url" to="/" style={ { 'marginLeft': '5px' } }>
                  Logout
                </Link>
              </div>
            </div>
            <div className="login-right">
              <img
                alt=""
                className="avatar"
                src={ `${ spotify.profile ? spotify.profile.images[0].url : null }` }
              />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify,
    tumblr: state.tumblr
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getUserSpotifyProfile, clearPostsAndErrors },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);