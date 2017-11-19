import React from 'react';
import { Route, Switch } from 'react-router-dom';

import WelcomeView from '../Home/WelcomeView';
import CoursesView from '../Course/CoursesView';
import CourseDetailsView from '../Course/CourseDetailsView';
import StudentsView from '../Student/StudentsView';
// import StudentDetailsView from '../Student/StudentDetailsView';
// import LecturersView from '../Lecturer/LecturersView';
// import LecturerDetailsView from '../Lecturer/LecturerDetailsView';

export default () => ((
  <Switch>
    <Route exact path="/" component={WelcomeView} />
    <Route exact path="/courses" component={CoursesView} />
    <Route exact path="/courses/:id" component={CourseDetailsView} />
    <Route exact path="/students" component={StudentsView} />
    {/*<Route exact path="/students/:id" component={StudentDetailsView} />*/}
    {/*<Route exact path="/lecturers" component={LecturersView} />*/}
    {/*<Route exact path="/lecturers/:id" component={LecturerDetailsView} />    */}
  </Switch>
));
