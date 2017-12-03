import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import CourseDetailsView from './CourseDetailsView';

@inject('CourseStore')
@observer
class CourseDetailsContainer extends Component {

  componentDidMount() {
    this.loadCourse();
  }

  /*
  * Helper methods
  * */

  // helper method to load a course with the id
  loadCourse = () => {
    const { CourseStore } = this.props;

    // retrieve the course id from URL
    const { id } = this.props.match.params;

    // return a form interface if it's on a 'create' route
    if (id === 'create') {
      CourseStore.course = {};
      CourseStore.courseDetailsEditing = true;

      return;
    }

    CourseStore.courseDetailsLoading = true;
    CourseStore.error = '';

    // retrieve all the courses
    CourseStore.getCourse(id);
  }

  /*
  * Event handlers
  * */

  handleInputChange = (event) => {
    const { CourseStore } = this.props;

    // get a reference to the object that dispatched the event
    const target = event.target;
    // get the value from the node
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // update the course
    CourseStore.course = {
      ...CourseStore.course,
      [name]: value
    }

  }

  handleEdit = () => {
    const { CourseStore } = this.props;

    CourseStore.courseDetailsEditing = true;
  }

  handleCancel = () => {
    const { CourseStore } = this.props;

    // get the course id parameter from URL
    const { id } = this.props.match.params;

    // check if it's adding new course or editing existing course
    if (id === 'create') {
      this.props.history.push('/courses');
    } else {
      CourseStore.course = CourseStore.tempCourse;
      CourseStore.courseDetailsEditing = false;
    }
  }

  handleConfirmDelete = () => {
    const { CourseStore } = this.props;

    CourseStore.deleteCourse(CourseStore.course.id).then(() => {
      this.props.history.push('/courses');
    });
  }

  handleSubmit = (event) => {
    // prevent the default submit action
    event.preventDefault();

    const { CourseStore } = this.props;

    CourseStore.courseDetailsSaving = true;

    if (this.props.match.params.id === 'create') {
      CourseStore.createCourse(CourseStore.course);
    } else {
      CourseStore.updateCourse(CourseStore.course.id, CourseStore.course);
    }

  }

  render() {
    return (
      <CourseDetailsView
        handleInputChange={this.handleInputChange}
        handleEdit={this.handleEdit}
        handleCancel={this.handleCancel}
        handleConfirmDelete={this.handleConfirmDelete}
        handleSubmit={this.handleSubmit} />
    )
  }
}

export default withRouter(CourseDetailsContainer);