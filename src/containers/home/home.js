import React, { Component } from "react";

// css.
import "./home.css";

// components.
import Login from "../../components/login/login";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Login />
      </div>
    );
  }
}

export default Home;
