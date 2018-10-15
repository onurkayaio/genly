import React from "react";
import { Link } from "react-router-dom";

// css.
import "./header.css";

// helpers.
import { deleteToken } from "./../../helpers/index";

const Header = ({ spotify }) => {
  function logout() {
    deleteToken();
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/dashboard">
          <img alt="" src={require("./../../images/dummy-logo.png")} />
        </Link>
      </div>
      <div className="login">
        <div className="login-left">
          <div className="user-name">{`${spotify.profile ? spotify.profile.display_name : null}`}</div>
          <div className="logout">
            <a href="/logout" className="logout-url">
              Share&ensp;
            </a>
            |
            <Link className="logout-url" to="/" onClick={logout}>
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
  );
};

export default Header;