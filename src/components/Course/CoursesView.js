import React, { Component } from 'react';
import Spinner from '../UI/Spinner';
import { inject, observer } from 'mobx-react';

import CoursesViewHeader from './CoursesViewHeader';
import CourseList from './CourseList';

@inject('CourseStore')
@observer
class CoursesView extends Component {

  // load courses when the component is successfully mounted
  componentDidMount() {
    this.loadCourses();
  }

  // helper function to load all courses
  loadCourses = () => {
    const { CourseStore } = this.props;

    CourseStore.courseViewLoading = true;

    // load all the courses
    CourseStore.loadCourses();
  }

  render() {
    const { courseViewLoading } = this.props.CourseStore;

    return (
      <div>
        <CoursesViewHeader />
        { courseViewLoading ? <Spinner /> : <CourseList /> }
      </div>
    )
  }
}

export default CoursesView;