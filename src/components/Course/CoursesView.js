import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import { inject, observer } from 'mobx-react';
import axios from 'axios';

import CourseCard from './CourseCard';

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
      CourseStore.addCourses(response.data);
      this.setState({ isLoading: false });
    });
  }

  renderSpinner = () => {
    return (
      <div className="spinner">
        <Spinner name="pacman" color="#3b6db0" />
      </div>
    )
  }

  renderCourseCard = () => {
    const { CourseStore } = this.props;

    return (
      <div className="row">
        {CourseStore.courses.map(
          course => <CourseCard course={course} key={course.id} />
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <Link to="/courses/create" className="btn btn-primary btn-add">
          Add new course
        </Link>
        <div>
          {/* display a spinner when loading the course data */}
          {/* display all the courses when course data loading is complete */}
          { this.state.isLoading ? this.renderSpinner() : this.renderCourseCard() }
        </div>
      </div>
    )
  }
}

export default CoursesView;