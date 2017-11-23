import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import StudentDetailsView from './StudentDetailsView';

import { getStudent, deleteStudent, createStudent, updateStudent } from '../../api/studentApi';
import { statusCodeToError } from '../../utils';

class StudentDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      error: '',
      student: null,
    };
  }

  componentDidMount() {
    this.loadStudent();
  }

  /*
  * Helper methods
  * */

  // helper method to load a student with the id
  loadStudent() {
    // retrieve the student id from URL
    const { id } = this.props.match.params;

    // return a form interface if it's on a 'create' route
    if (id === 'create') {
      this.setState({
        student: {}, isEditing: true
      });

      return;
    }

    this.setState({ isLoading: true, error: '' });

    const onSuccess = (response) => {
      this.student = response.data;
      this.setState({
        student: response.data,
        isLoading: false,
      });
    };

    const onFail = (error) => {
      this.setState({
        student: null,
        error: statusCodeToError(error.response.status),
        isLoading: false,
      });
    };

    // retrieve all the students
    getStudent(id)
      .then(onSuccess)
      .catch(onFail);
  }

  /*
  * Event handlers
  * */

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      student: {
        ...this.state.student,
        [name]: value,
      },
    });
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSaving: true });

    const { student } = this.state;

    const onSuccess = (response) => {
      // update the student state with the data from API call
      // set the isEditing to false to exit editing mode
      this.setState({
        isEditing: false,
        isSaving: false,
        student: response.data,
      });
    };

    if (this.props.match.params.id === 'create') {
      createStudent(student)
        .then(onSuccess);
    } else {
      updateStudent(student.id, student)
        .then(onSuccess);
    }
  }

  handleCancel = () => {
    // get the student id parameter from URL
    const { id } = this.props.match.params;

    // check if it's adding new student or editing existing course
    if (id === 'create') {
      this.props.history.push('/students');
    } else {
      this.setState({
        isEditing: false,
      });
    }
  }

  handleConfirmDelete = () => {
    const { student } = this.state;

    deleteStudent(student.id)
      .then(() => {
        this.props.history.push('/students');
      });
  }

  render() {
    return <StudentDetailsView
      handleInputChange={this.handleInputChange}
      handleEdit={this.handleEdit}
      handleCancel={this.handleCancel}
      handleConfirmDelete={this.handleConfirmDelete}
      handleSubmit={this.handleSubmit}
      {...this.state} />
  }
}

export default withRouter(StudentDetailsContainer);
