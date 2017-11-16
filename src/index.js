import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import Shell from './App/Shell';

import registerServiceWorker from './registerServiceWorker';

// set a default URL that applies to every request
axios.defaults.baseURL = 'http://react.fail';

ReactDOM.render(
  <Router>
    <Shell />
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
