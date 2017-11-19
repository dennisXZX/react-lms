import React, { Component } from 'react';
import ReactSpinner from 'react-spinkit';

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <ReactSpinner name="pacman" color="#3b6db0" />
      </div>
    )
  }
}

export default Spinner;

