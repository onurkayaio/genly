import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// components.
import Search from '../../components/search/search';
import Header from '../../components/header/header';
import Toaster from '../../components/toaster/toaster';
import Spinner from '../../components/spinner/spinner';
import Playlist from '../../components/playlist/playlist';

import './../../style.scss';

// helpers.
import { getToken } from './../../helpers';

import './dashboard.css';
import PopularBlogs from '../../components/popularBlogs/popularBlogs';
import RecentPlaylists from '../../components/recentPlaylists/recentPlaylists';

class Dashboard extends Component {
  render() {
    return (
      <div>
        { getToken() ? (
          <div>
            <Header/>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <Search/>
                </div>
                <PopularBlogs/>
                <RecentPlaylists/>
              </div>
            </div>
            <Playlist/>
          </div>
        ) : (
          <div>
            <Redirect to="/"/>
          </div>
        ) }
        <Toaster/>
        <Spinner/>
      </div>
    );
  }
}

export default Dashboard;
