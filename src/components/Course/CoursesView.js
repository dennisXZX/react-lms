import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import CoursesViewHeader from './CoursesViewHeader';
import CourseList from './CourseList';

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

    // issue a GET request to fetch all courses
    axios.get('/api/courses').then((response) => {
      CourseStore.loadCourses(response.data);
      this.setState({ isLoading: false });
    });
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