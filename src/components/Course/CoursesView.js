import React, { Component } from 'react';
import Spinner from '../UI/Spinner';
import { inject, observer } from 'mobx-react';

import CoursesViewHeader from './CoursesViewHeader';
import CourseList from './CourseList';

import { getAllCourses } from '../../api/courseApi';

@inject('CourseStore')
@observer
class CoursesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  // load courses when the component is successfully mounted
  componentDidMount() {
    this.loadCourses();
  }

  // helper function to load all courses
  loadCourses = () => {
    const { CourseStore } = this.props;

    this.setState({ isLoading: true });

    const onSuccess = (response) => {
      CourseStore.loadCourses(response.data);
      this.setState({ isLoading: false });
    };

    // fetch all courses
    getAllCourses()
      .then(onSuccess);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        <CoursesViewHeader />
        { isLoading ? <Spinner /> : <CourseList /> }
      </div>
    )
  }
}

export default CoursesView;