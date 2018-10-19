import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// css.
import "./search.css";

const Search = ({ error, onChange }) => {
  if (error) {
    toast(error, { type: toast.TYPE.WARNING });
  }

  return (
    <div>
      {error ? (
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      ) : null}

      <div className="search-componenet">
        <input
          onKeyPress={onChange}
          type="input"
          name="name"
          className="question"
          id="nme"
          required
          autoComplete="off"
        />
        <label htmlFor="nme">
          <span>What's the blog name?</span>
        </label>
      </div>
    </div>
  );
};

export default Search;
