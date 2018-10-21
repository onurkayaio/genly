import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import connect from "react-redux/es/connect/connect";

// components.
import Search from "../../components/search/search";
import Header from "../../components/header/header";
import Toaster from "../../components/toaster/toaster";

// helpers.
import { getToken } from "./../../helpers";

class Dashboard extends Component {
  render() {
    let { tumblr } = this.props;
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

        {tumblr.error ? <Toaster error={tumblr.error} /> : null}

        {tumblr.isFetched ? (
          <div>
            <img alt="loading" src={require("../../images/loading.gif")} />
          </div>
        ) : (
          <div>NOTTTTTTT</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr
  };
}

export default connect(
  mapStateToProps,
)(Dashboard);
