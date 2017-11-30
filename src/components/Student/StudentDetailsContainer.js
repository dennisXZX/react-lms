import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import StudentDetailsView from './StudentDetailsView';

@inject('StudentStore')
@observer
class StudentDetailsContainer extends Component {

  componentDidMount() {
    this.loadStudent();
  }

  /*
  * Helper methods
  * */

  // helper method to load a student with the id
  loadStudent() {
    const { StudentStore } = this.props;

    // retrieve the student id from URL
    const { id } = this.props.match.params;

    // return a form interface if it's on a 'create' route
    if (id === 'create') {

      StudentStore.student = {};
      StudentStore.studentDetailsEditing = true;

      return;
    }

    StudentStore.studentDetailsLoading = true;
    StudentStore.error = '';

    // retrieve all the students
    StudentStore.getStudent(id);

  }

  /*
  * Event handlers
  * */

  handleInputChange = (event) => {
    const { StudentStore } = this.props;

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    StudentStore.student = {
      ...StudentStore.student,
      [name]: value
    }
  }

  handleEdit = () => {
    const { StudentStore } = this.props;

    StudentStore.studentDetailsEditing = true;
  }

  handleSubmit = (event) => {

    event.preventDefault();

    const { StudentStore } = this.props;

    StudentStore.studentDetailsSaving = true;

    if (this.props.match.params.id === 'create') {
      StudentStore.createStudent(StudentStore.student);
    } else {
      StudentStore.updateStudent(StudentStore.student.id, StudentStore.student);
    }
  }

  handleCancel = () => {
    const { StudentStore } = this.props;

    // get the student id parameter from URL
    const { id } = this.props.match.params;

    // check if it's adding new student or editing existing course
    if (id === 'create') {
      this.props.history.push('/students');
    } else {
      StudentStore.studentDetailsEditing = false;
    }
  }

  handleConfirmDelete = () => {
    const { StudentStore } = this.props;

    StudentStore.deleteStudent(StudentStore.student.id);

    this.props.history.push('/students');
  }

  render() {
    const { StudentStore } = this.props;

    return <StudentDetailsView
      handleInputChange={this.handleInputChange}
      handleEdit={this.handleEdit}
      handleCancel={this.handleCancel}
      handleConfirmDelete={this.handleConfirmDelete}
      handleSubmit={this.handleSubmit} />
  }
}

export default withRouter(StudentDetailsContainer);
