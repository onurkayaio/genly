import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

// css.
import './footer.css';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    let { isFetched } = this.props.tumblr;
    let { playlist } = this.props.spotify;

    return (
      <div>
        { !isFetched ? (
          <div id={ playlist.status && playlist.status === 201 ? 'fixed-footer' : 'not-fixed-footer' }>
            <div className="container">
              <ul className="float-left">
                <li>
                  <NavLink to="/privacy">
                    Privacy
                  </NavLink>
                </li>
                {/*|
          <li>
            Feedback
          </li>*/ }
              </ul>

              {/*<div className="float-right">
                <ul>
                  <li>
                    Follow Us:
                  </li>
                  <li>
                    <a
                      href="http://localhost:3000/dashboard"
                      title="github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"/>
                    </a>
                  </li>
                  <li>çıkı
                    <a
                      href="http://localhost:3000/dashboard"
                      title="github"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-tumblr"/>
                    </a>
                  </li>
                </ul>
              </div>*/ }
              <div className="float-right">
                <div className=''>
                  made with <span className="love">♥</span> by <a href="https://www.linkedin.com/in/onurkayaio/"
                                                                  target="_blank"
                                                                  rel="noopener noreferrer">onur kaya.</a>
                </div>
              </div>
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
    tumblr: state.tumblr,
    spotify: state.spotify
  };
}

export default connect(mapStateToProps)(Footer);
