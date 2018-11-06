import React, { Component } from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

// css.
import "./search.css";

// actions.
import { getUserBlogPosts } from "../../actions/tumblr";

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.which === 13 && event.currentTarget.value) {
      this.props.getUserBlogPosts(event.currentTarget.value);
    }
  }

  render() {
    let { tracks, isFetched } = this.props.tumblr;

    return (
      <div>
        {!isFetched ? (
          <div>
            {tracks.length === 0 ? (
              <div className="search-componenet">
                <input
                  onKeyPress={this.handleChange}
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
            ) : null}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserBlogPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
