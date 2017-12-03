import React, { Component } from 'react';

class WelcomeView extends Component {

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="row chart">
          <div className="col-sm-4 text-center">.col-md-4</div>
          <div className="col-sm-4 text-center">.col-md-4</div>
          <div className="col-sm-4 text-center">.col-md-4</div>
        </div>
      </div>
    );
  }
}

export default WelcomeView;