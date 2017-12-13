import React from 'react';
import { Route, Switch } from 'react-router-dom';

import WelcomeView from '../Home/WelcomeView';
import CoursesView from '../Course/CoursesView';
import CourseDetailsContainer from '../Course/CourseDetailsContainer';
import StudentsView from '../Student/StudentsView';
import StudentDetailsContainer from '../Student/StudentDetailsContainer';
import LecturersView from '../Lecturer/LecturersView';
import LecturerDetailsContainer from '../Lecturer/LecturerDetailsContainer';
import ExamTimeView from '../ExamTime/ExamTimeView';
import TodoView from '../Todo/TodoView';

export default () => ((
  <Switch>
    <Route exact path="/" component={WelcomeView} />
    <Route exact path="/courses" component={CoursesView} />
    <Route exact path="/courses/:id" component={CourseDetailsContainer} />
    <Route exact path="/students" component={StudentsView} />
    <Route exact path="/students/:id" component={StudentDetailsContainer} />
    <Route exact path="/lecturers" component={LecturersView} />
    <Route exact path="/lecturers/:id" component={LecturerDetailsContainer} />
    <Route exact path="/examtime" component={ExamTimeView} />
    <Route exact path="/todo" component={TodoView} />
  </Switch>
));
