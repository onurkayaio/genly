import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css.
import "./toaster.css";
import connect from "react-redux/es/connect/connect";

class Toaster extends Component {
  render() {
    let { tumblr, spotify } = this.props;

    if (tumblr.error) {
      toast(tumblr.error, {
        type: toast.TYPE.WARNING
      });
    }

    if (spotify.error) {
      toast(tumblr.error, {
        type: toast.TYPE.WARNING
      });
    }

    return (
      <div>
        {tumblr.error ? <ToastContainer
          toastClassName="toast-container"
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        /> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr,
    spotify: state.spotify
  };
}

export default connect(
  mapStateToProps,
)(Toaster);