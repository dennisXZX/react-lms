import React, { Component } from 'react';

import Routes from './Routes';
import TopNav from './TopNav';

class Shell extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <main className="container">
          <Routes />
        </main>
      </div>
    );
  }
}

export default Shell;
