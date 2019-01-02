import React from "react";

// css.
import "./information.css";

const Information = ({ blogProfile, countOfTracks }) => {
  return (
    <table>
      <tr>
        <td>blog</td>
        <td className="right">{blogProfile["name"]}.tumblr.com</td>
      </tr>
      <tr>
        <td>count of music
          {/*<i className="tooltips fas fa-question-circle">
            <span>Musics that we generated can be less than in the blog.</span>
          </i>*/}
        </td>
        <td className="right">{countOfTracks}</td>
      </tr>
    </table>
  );
};

export default Information;
