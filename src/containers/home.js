import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// actions
import { testAction } from "../actions/index";

class Home extends Component {
  componentWillMount() {
    this.props.testAction();
  }

  render() {
    return <div>home component</div>;
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
