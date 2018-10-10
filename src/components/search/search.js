import React, { Component } from "react";

// css.
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="search-componenet">
        <input
          onChange={this.handleChange}
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
  }
}

export default Search;
