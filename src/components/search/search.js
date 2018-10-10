import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// actions
import { getUserBlogPosts } from "../../actions/tumblr";

// css.
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = e => {
    if (e.which === 13) {
      this.handleChange(e.target.value);
    }
  };

  handleChange(value) {
    this.props.getUserBlogPosts(value);
  }

  render() {
    return (
      <div>
        <div className="search-componenet">
          <input
            onKeyPress={this.onKeyPress}
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
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserBlogPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
