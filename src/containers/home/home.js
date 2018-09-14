import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// actions
import { testAction } from "../../actions";

// css.
import "./home.css";

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

function mapStateToProps(state) {
  return {
    test: state.test
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ testAction }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
