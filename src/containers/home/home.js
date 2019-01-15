import React, { Component } from 'react';

// css.
import './home.css';

// components.
import Login from '../../components/login/login';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Login/>

        <div>
          <img className="nick-cave" alt="" src={ require('./../../images/nick_cave.jpg') }/>
          <img className="leonard-cohen" alt="" src={ require('./../../images/leonard_cohen.jpg') }/>
          <img className="tom-waits" alt="" src={ require('../../images/tom_waits.jpg') }/>
        </div>
      </div>
    );
  }
}

export default Home;
