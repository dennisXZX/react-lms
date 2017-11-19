import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import axios from 'axios';

import Shell from './components/App/Shell';

import CourseStore from './stores/CourseStore';

import './styles';

// employ service worker to make a progressive web app
import registerServiceWorker from './registerServiceWorker';

// set a default URL that applies to every request
axios.defaults.baseURL = 'http://react.fail';

ReactDOM.render(
  <Router>
    <Provider CourseStore={CourseStore}>
      <Shell />
    </Provider>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
