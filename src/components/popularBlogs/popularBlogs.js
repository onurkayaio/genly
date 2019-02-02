import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

// css.
import './popularBlogs.css';

// actions.
import { getPopularBlogs, getUserBlogPosts } from '../../actions/tumblr';

class PopularBlogs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPopularBlogs();
  }

  createTable = () => {
    return this.props.tumblr.populars.map(function (value) {
      return (
        <tr key={ value._id }>
          <th>
            { value._id }.tumblr.com
          </th>
          <th>
            { value.count } times
          </th>
          <th>
            <a onClick={ () => this.props.getUserBlogPosts(value._id) }>
              <i className="fas fa-angle-double-right"/>
            </a>
          </th>
        </tr>
      );
    }, this);
  };

  render() {

    return (
      <div className="info-container">
        <table className="popular-blogs-table">
          { this.createTable() }
        </table>
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
