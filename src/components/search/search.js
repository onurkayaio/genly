import React from "react";

// css.
import "./search.css";

const Search = ({ onChange }) => {
  return (
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
  );
};

export default Search;
