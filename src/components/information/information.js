import React from "react";

// css.
import "./information.css";

const Information = ({ blogProfile, countOfTracks }) => {
  return (
    <div>
      <h5>
        we found <b className="lol">{countOfTracks}</b> tracks on{" "}
        <b className="lol2">{blogProfile["name"]}</b>
        .tumblr.com
      </h5>
    </div>
  );
};

export default Information;
