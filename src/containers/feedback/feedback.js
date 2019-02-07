import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// css.
import './feedback.css';

class Feedback extends Component {
  render() {
    return (
      <div className="container">
        <div className="more-about">
          <ul>
            <li>
              <NavLink to='/'>
                Home
              </NavLink>
            </li>
            |
            <li>
              <NavLink to='/privacy'>
                Privacy
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="feedback">
          <div className="row">
            <div className="col-md-6 col-12 feedback-info">
              <img
                alt=""
                src={ require('../../images/logo.png') }
                className="feedback-image"
              />
              <div className="homepage-info">
                Thanks for filling the feedback form and helping us to improve our service.
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="typeform-widget" data-url="https://onurkaya3.typeform.com/to/EHx15J"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
