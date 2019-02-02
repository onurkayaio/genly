import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

// css.
import './search.css';

// actions.
import { getUserBlogPosts } from '../../actions/tumblr';
import PopularBlogs from '../popularBlogs/popularBlogs';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if ( event.which === 13 && event.currentTarget.value ) {
      this.props.getUserBlogPosts(event.currentTarget.value);
    }
  }

  render() {
    let { tracks, isFetched } = this.props.tumblr;

    return (
      <div>
        { !isFetched ? (
          <div>
            { tracks.length === 0 ? (
              <div className="container">
                <div className="row">
                  <div className="search-componenet col-md-6">
                    <div className="col-md-12">
                      <input
                        onKeyPress={ this.handleChange }
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
                    <div className="search-info-list">
                      <div className="col-md-12">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <i className="fas fa-check"/>
                            <span>
                          The number of music may differ from the blog.
                        </span>
                          </li>
                          <li className="list-group-item">
                            <i className="fas fa-check"/>
                            <span>
                          The blog visibility must be open to everyone.
                        </span>
                          </li>
                          <li className="list-group-item">
                            <i className="fas fa-check"/>
                            <span>
                          Generate playlist by only the list of spotify posts.
                        </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="offset-md-1 col-md-5 " style={ { 'marginTop': '150px' } }>
                    <PopularBlogs/>
                  </div>
                </div>
              </div>
            ) : null }
          </div>
        ) : null }
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
