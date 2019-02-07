import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// components.
import Search from '../../components/search/search';
import Header from '../../components/header/header';
import Toaster from '../../components/toaster/toaster';
import Spinner from '../../components/spinner/spinner';
import Playlist from '../../components/playlist/playlist';
import PopularBlogs from '../../components/popularBlogs/popularBlogs';
import RecentPlaylists from '../../components/recentPlaylists/recentPlaylists';
import Footer from '../../components/footer/footer';

import './../../style.scss';

// helpers.
import { getToken } from './../../helpers';

import './dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div>
        { getToken() ? (
          <div>
            <Header/>
            <Playlist/>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <Search/>
                </div>
                <PopularBlogs/>
                <RecentPlaylists/>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Redirect to="/"/>
          </div>
        ) }
        <Toaster/>
        <Spinner/>
        <Footer isFixed={ false }/>
      </div>
    );
  }
}

export default Dashboard;
