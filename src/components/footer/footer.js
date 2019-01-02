import React from "react";

// css.
import "./footer.css";

const Footer = ({ isFixed }) => {
  return (
    <div id={isFixed ? "fixed-footer" : "not-fixed-footer"} className="text-center">
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </div>
  );
};

export default Footer;
