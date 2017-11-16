import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import axios from 'axios';

import CourseCard from './CourseCard';

class CoursesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courses: [],
    };
  }

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ isLoading: true });
    axios.get('/api/courses').then((response) => {
      this.setState({ courses: response.data, isLoading: false });
    });
  }

  render() {
    return (
      <div>
        <h1 className="title">Courses</h1>
        <Link to="/courses/create" className="btn btn-primary">Add new course</Link>
        <div style={{ marginTop: 20 }}>
          {this.state.isLoading && <Spinner name="pacman" color="#e74c3c"/>}
          {!this.state.isLoading && (
            <div className="row">
              {this.state.courses.map(course => <CourseCard course={course} key={course.id} />)}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CoursesView;