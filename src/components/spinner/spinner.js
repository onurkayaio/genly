import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";

import "./spinner.css";

class Spinner extends Component {
  render() {
    let { tumblr } = this.props;

    console.log(tumblr);
    return (
      <div>
        {tumblr.isFetched ? (
          <div className="spinner">
            <img alt="loading" src={require("../../images/spinner.gif")} />
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr
  };
}

export default connect(mapStateToProps)(Spinner);
