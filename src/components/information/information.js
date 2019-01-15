import React from 'react';

// css.
import './information.css';

const Information = ({ blogProfile, countOfTracks }) => {
  return (
    <table>
      <tr>
        <td><i className="fab fa-tumblr" style={ { 'paddingRight': '5px' } }/> blog:</td>
        <td className="float-right">{ blogProfile }.tumblr.com</td>
      </tr>
      <tr>
        <td><i className="fas fa-sort-amount-up" style={ { 'paddingRight': '5px' } }/>track count</td>
        <td className="float-right">{ countOfTracks }</td>
      </tr>
    </table>
  );
};

export default Information;
