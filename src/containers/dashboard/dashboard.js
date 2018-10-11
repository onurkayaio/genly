import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  loggedInStatus() {
    if (getToken()) return true;
    else return false;
  }

  render() {
    return (
      <div>
        {this.loggedInStatus() ? (
          <div>
            <Header />
            <div>
              <Search />
            </div>
          </div>
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
