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

  // load courses when the component is successfully mounted
  componentDidMount() {
    this.loadCourses();
  }

  // helper function to load all courses
  loadCourses = () => {
    this.setState({ isLoading: true });

    // issue a GET request to fetch all courses
    axios.get('/api/courses').then((response) => {
      console.log(response);
      this.setState({
        courses: response.data,
        isLoading: false
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <Link to="/courses/create" className="btn btn-primary btn-add">Add new course</Link>
        <div>
          {/* display a spinner when loading the course data */}
          {this.state.isLoading && <div className="spinner"><Spinner name="pacman" color="#3b6db0" /></div>}
          {/* display all the courses when course data loading is complete */}
          {!this.state.isLoading && (
            <div className="row">
              {this.state.courses.map(
                course => <CourseCard course={course} key={course.id} />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CoursesView;