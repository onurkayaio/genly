import React, { Component } from "react";

// css.
import "./search.css";

class Search extends Component {
  render() {
    return (
      <div className="search-componenet">
        <input
          type="text"
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
  }
}

export default Search;
