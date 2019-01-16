import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

import './spinner.css';

const textArray = ['getting data...', 'loading...', 'almost done...'];

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = { textIdx: 0 };
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    let { tumblr } = this.props;
    let textThatChanges = textArray[this.state.textIdx % textArray.length];

    return (
      <div>
        { tumblr.isFetched ? (
          <div className="equalizer">
            <span className="bar bar-1"/>
            <span className="bar bar-2"/>
            <span className="bar bar-3"/>
            <p className="loading-text">
              { textThatChanges }
            </p>
          </div>
        ) : null }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tumblr: state.tumblr
  };
}

export default connect(mapStateToProps)(Spinner);
