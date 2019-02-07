import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

// css.
import './footer.css';

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
                  Privacy
                </li>
                {/*|
          <li>
            Feedback
          </li>*/ }
              </ul>

              <div className="float-right">
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
                  <li>
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
