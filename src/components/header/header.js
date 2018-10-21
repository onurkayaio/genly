import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

// actions.
import { getUserSpotifyProfile } from "../../actions/spotify";

// css.
import "./header.css";

class Header extends Component {
  componentDidMount() {
    this.props.getUserSpotifyProfile();
  }

  render() {
    let { spotify } = this.props;

    return (
      <div>
        <header className="header">
          <div className="logo">
            <Link to="/dashboard">
              <img alt="" src={require("./../../images/dummy-logo.png")} />
            </Link>
          </div>
          <div className="login">
            <div className="login-left">
              <div className="user-name">{`${
                spotify.profile ? spotify.profile.display_name : null
                }`}</div>
              <div className="logout">
                <a href="/logout" className="logout-url">
                  Share&ensp;
                </a>
                |
                <Link className="logout-url" to="/">
                  &ensp;Logout
                </Link>
              </div>
            </div>
            <div className="login-right">
              <img
                alt=""
                className="avatar"
                src={`${spotify.profile ? spotify.profile.images[0].url : null}`}
              />
            </div>
          </div>
        </header>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spotify: state.spotify
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getUserSpotifyProfile },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);