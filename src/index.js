import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import axios from 'axios';

import Shell from './components/App/Shell';

import CourseStore from './stores/CourseStore';
import StudentStore from './stores/StudentStore';
import ExamTimeStore from './stores/ExamTimeStore';
import TodoStore from './stores/TodoStore';
import HomeStore from './stores/HomeStore';
import LecturerStore from './stores/LecturerStore';

import './styles';

// employ service worker to make a progressive web app
import registerServiceWorker from './registerServiceWorker';

// set a default URL that applies to every request
// axios.defaults.baseURL = 'http://react.fail';

// API is hosted on AWS EC2
// axios.defaults.baseURL = 'http://52.65.68.185/';
axios.defaults.baseURL = 'http://laravel-api.dev/';

ReactDOM.render(
  <Router>
    <Provider
      CourseStore={CourseStore}
      StudentStore={StudentStore}
      ExamTimeStore={ExamTimeStore}
      TodoStore={TodoStore}
      HomeStore={HomeStore}
      LecturerStore={LecturerStore}>
      <Shell />
    </Provider>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
