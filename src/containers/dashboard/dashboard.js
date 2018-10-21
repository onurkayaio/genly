import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";
import Toaster from "../../components/toaster/toaster";
import Spinner from "../../components/spinner/spinner";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  render() {
    return (
      <div>
        {getToken() ? (
          <div>
            <Header />
            <Search />
          </div>
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}

        <Toaster />
        <Spinner />
      </div>
    );
  }
}

export default Dashboard;
