import React from 'react';
import { Route, Switch } from 'react-router-dom';

import WelcomeView from '../Home/WelcomeView';
// import CourseDetailsView from '../Course/CourseDetailsView';
// import CoursesView from '../Course/CoursesView';
// import LecturerDetailsView from '../Lecturer/LecturerDetailsView';
// import LecturersView from '../Lecturer/LecturersView';
// import StudentDetailsView from '../Student/StudentDetailsView';
// import StudentsView from '../Student/StudentsView';

export default () => ((
  <Switch>
    <Route exact path="/" component={WelcomeView} />
    {/*<Route exact path="/courses" component={CoursesView} />*/}
    {/*<Route exact path="/courses/:id" component={CourseDetailsView} />*/}
    {/*<Route exact path="/students" component={StudentsView} />*/}
    {/*<Route exact path="/students/:id" component={StudentDetailsView} />*/}
    {/*<Route exact path="/lecturers" component={LecturersView} />*/}
    {/*<Route exact path="/lecturers/:id" component={LecturerDetailsView} />    */}
  </Switch>
));
