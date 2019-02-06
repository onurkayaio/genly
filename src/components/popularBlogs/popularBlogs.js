import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

// css.
import './popularBlogs.css';

// actions.
import { getPopularBlogs, getUserBlogPosts } from '../../actions/tumblr';

class PopularBlogs extends Component {
  componentWillMount() {
    this.props.getPopularBlogs();
  }

  createTable = () => {
    return this.props.tumblr.populars.map(function (value) {
      return (
        <tr key={ value.blog }>
          <th>
            { value.blog }.tumblr.com
          </th>
          <th>
            { value.count } times
          </th>
          <th>
            <button className="btn" style={ { 'background': 'transparent' } }
                    onClick={ () => this.props.getUserBlogPosts(value.blog) }>
              <i className="fas fa-angle-double-right"/>
            </button>
          </th>
        </tr>
      );
    }, this);
  };

  render() {

    let { tracks, isFetched } = this.props.tumblr;
    return (
      <div className="col-md-6">
        { !isFetched && tracks.length === 0 ? (
          <div className="offset-md-2 col-md-10" style={ { 'marginTop': '150px' } }>
            <div className="popular-container">
              <p className="popular-blogs-header">
                Popular Blogs
              </p>
              <table className="popular-blogs-table">
                <tbody>
                { this.createTable() }
                </tbody>
              </table>
            </div>
          </div>
        ) : null
        }
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
  return bindActionCreators({ getPopularBlogs, getUserBlogPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularBlogs);
