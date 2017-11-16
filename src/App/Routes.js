import React from 'react';
import { Route, Switch } from 'react-router-dom';

import WelcomeView from '../Home/WelcomeView';
// import CourseDetailsView from '../Course/CourseDetailsView';
// import CoursesView from '../Course/CoursesView';

export default () => ((
  <Switch>
    <Route exact path="/" component={WelcomeView} />
    {/*<Route exact path="/courses" component={CoursesView} />*/}
    {/*<Route exact path="/courses/:id" component={CourseDetailsView} />*/}
  </Switch>
));
