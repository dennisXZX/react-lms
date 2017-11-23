import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CourseDetailsView from './CourseDetailsView';

import { getCourse } from '../../api/courseApi';
import { statusCodeToError } from '../../utils';

class CourseDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      error: '',
      course: null,
    };
  }

  componentDidMount() {
    this.loadCourse();
  }

  /*
  * Helper methods
  * */

  // helper method to load a course with the id
  loadCourse = () => {
    // retrieve the course id from URL
    const { id } = this.props.match.params;

    // return a form interface if it's on a 'create' route
    if (id === 'create') {
      this.setState({
        course: {},
        isEditing: true
      });

      return;
    }

    this.setState({ isLoading: true, error: '' });

    const onSuccess = (response) => {
      this.course = response.data;
      this.setState({
        course: response.data,
        isLoading: false,
      });
    };

    const onFail = (error) => {
      this.setState({
        course: null,
        error: statusCodeToError(error.response.status),
        isLoading: false,
      });
    };

    getCourse(id)
      .then(onSuccess)
      .catch(onFail);
  }

  /*
  * Event handlers
  * */

  handleInputChange = (event) => {
    // get a reference to the object that dispatched the event
    const target = event.target;
    // get the value from the node
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // store the value into state
    this.setState({
      course: {
        ...this.state.course,
        [name]: value,
      },
    });
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleCancel = () => {
    // get the course id parameter from URL
    const { id } = this.props.match.params;

    // check if it's adding new course or editing existing course
    if (id === 'create') {
      this.props.history.push('/courses');
    } else {
      this.setState({
        isEditing: false
      });
    }
  }

  handleConfirmDelete = () => {
    const { course } = this.state;

    this.setState({ isDeleting: true });
    axios.delete(`/api/courses/${course.id}`)
      .then(() => {
        this.props.history.push('/courses');
      });
  }

  handleSubmit = (event) => {
    // prevent the default submit action
    event.preventDefault();

    this.setState({ isSaving: true });

    const { course } = this.state;

    // callback function on fulfilled promise
    const onSuccess = (response) => {
      // update the course state with the data from API call
      // set the isEditing to false to exit editing mode
      this.setState({
        isEditing: false,
        isSaving: false,
        course: response.data,
      });
    };

    if (this.props.match.params.id === 'create') {
      axios.post('/api/courses', course)
        .then(onSuccess);
    } else {
      axios.put(`/api/courses/${course.id}`, course)
        .then(onSuccess);
    }

  }

  render() {
    return (
      <CourseDetailsView
        handleInputChange={this.handleInputChange}
        handleEdit={this.handleEdit}
        handleCancel={this.handleCancel}
        handleConfirmDelete={this.handleConfirmDelete}
        handleSubmit={this.handleSubmit}
        {...this.state} />
    )
  }
}

export default withRouter(CourseDetailsContainer);