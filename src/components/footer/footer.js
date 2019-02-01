import React from 'react';

// css.
import './footer.css';

const Footer = ({ isFixed }) => {
  return (
    <div id={ isFixed ? 'fixed-footer' : 'not-fixed-footer' }>
      <div className="container">
        <ul className="float-left">
          <li>
            Privacy
          </li>
          |
          <li>
            Roadmap
          </li>
          |
          <li>
            Feedback
          </li>
        </ul>

        <div className="float-right">
          <ul>
            <li>
              Follow Us:
            </li>
            <li>
              <a
                title="github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                title="github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-tumblr"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
