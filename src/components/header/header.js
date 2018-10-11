import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

// actions
import { getUserSpotifyProfile } from "../../actions/spotify";

// css.
import "./header.css";

// helpers.
import { deleteToken } from "./../../helpers/index";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    this.props.getUserSpotifyProfile();
  }

  logout() {
    deleteToken();
  }

  render() {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/dashboard">
            <img alt="" src={require("./../../images/dummy-logo.png")} />
          </Link>
        </div>
        <div className="login">
          <div className="login-left">
            <div className="user-name">Onur Kaya</div>
            <div className="logout">
              <a href="/logout" className="logout-url">
                Share&ensp;
              </a>
              |
              <Link className="logout-url" to="/" onClick={this.logout}>
                &ensp;Logout
              </Link>
            </div>
          </div>
          <div className="login-right">
            <img
              alt=""
              className="avatar"
              src={`${
                this.props.spotify.profile && this.props.spotify.profile.images
                  ? this.props.spotify.profile.images[0].url
                  : null
              }`}
            />
          </div>
        </div>
      </header>
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
)(Header);
