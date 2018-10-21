import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css.
import "./toaster.css";

const Toaster = ({ error }) => {
  if (error) {
    toast(error, {
      type: toast.TYPE.WARNING
    });
  }

  return (
    <div>
      <ToastContainer
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
      />
    </div>
  );
};

export default Toaster;
