import React from 'react';

// css.
import './information.css';

const Information = ({ blogProfile, countOfTracks }) => {

  let blogName = { blogProfile } + '.tumblr.com';

  return (
    <table>
      <tr>
        <td><i className="fab fa-tumblr" style={ { 'paddingRight': '5px' } }/> blog:</td>
        <td className="float-right"><a href={ blogName }>blogName</a></td>
      </tr>
      <tr>
        <td><i className="fas fa-sort-amount-up" style={ { 'paddingRight': '5px' } }/>track count</td>
        <td className="float-right">{ countOfTracks }</td>
      </tr>
    </table>
  );
};

export default Information;
