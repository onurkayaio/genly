import React from "react";

// css.
import "./header.css";

const Header = props => {
  return (
    <header className="header">
      <div className="logo">
        <img alt="lol" src={require("./../../images/dummy-logo.png")} />
      </div>
      <div className="login">
        <div className="login-left">
          <div className="user-name">Onur Kaya</div>
          <div className="logout">
            <a href="/logout" className="logout-url">
              Share&ensp;
            </a>
            |
            <a href="/logout" className="logout-url">
              &ensp;Logout
            </a>
          </div>
        </div>
        <div className="login-right">
          <img
            alt="lol"
            className="avatar"
            src={`${
              props.profile && props.profile.images
                ? props.profile.images[0].url
                : null
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
