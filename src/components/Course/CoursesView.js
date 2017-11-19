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
      CourseStore.loadCourses(response.data);
      this.setState({ isLoading: false });
    });
  }

  /*
  * Event handlers
  * */

  handleSearchInputChange = (event) => {
    // update the filter property in store
    this.props.CourseStore.filter = event.target.value;
  }

  /*
  * Render helper methods
  * */

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
        {CourseStore.filteredCourses.map(
          course => <CourseCard course={course} key={course.id} />
        )}
      </div>
    )
  }

  render() {
    const { CourseStore } = this.props;

    return (
      <div>
        <h1>Courses ({CourseStore.courseCount} in total)</h1>
        <div className="row" style={{ margin: '20px 0' }}>
          <div className="col-sm-6" style={{ padding: '0' }}>
            <Link to="/courses/create" className="btn btn-primary">
              Add new course
            </Link>
          </div>
          <div className="col-sm-6" style={{ padding: "0" }}>
            <input
              value={CourseStore.filter}
              onChange={this.handleSearchInputChange}
              style={{ paddingLeft: "10px", width: "200px"}}
              className="pull-right"
              type="text"
              placeholder="Search a course" />
          </div>
        </div>
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