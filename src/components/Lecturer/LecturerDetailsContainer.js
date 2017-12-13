import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import LecturerDetailsView from './LecturerDetailsView';

@inject('LecturerStore')
@observer
class LecturerDetailsContainer extends Component {

  componentDidMount() {
    this.loadLecturer();
  }

  /*
  * Helper methods
  * */

  // helper method to load a lecturer with the id
  loadLecturer() {
    const { LecturerStore } = this.props;

    // retrieve the lecturer id from URL
    const { id } = this.props.match.params;

    // return a form interface if it's on a 'create' route
    if (id === 'create') {

      LecturerStore.lecturer = {};
      LecturerStore.lecturerDetailsEditing = true;

      return;
    }

    LecturerStore.lecturerDetailsLoading = true;
    LecturerStore.error = '';

    // retrieve the lecturer matched the id
    LecturerStore.getLecturer(id);

  }

  /*
  * Event handlers
  * */

  handleInputChange = (event) => {
    const { LecturerStore } = this.props;

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    LecturerStore.lecturer = {
      ...LecturerStore.lecturer,
      [name]: value
    }
  }

  handleEdit = () => {
    const { LecturerStore } = this.props;

    LecturerStore.lecturerDetailsEditing = true;
  }

  handleSubmit = (event) => {

    event.preventDefault();

    const { LecturerStore } = this.props;

    LecturerStore.lecturerDetailsSaving = true;

    if (this.props.match.params.id === 'create') {
      LecturerStore.createLecturer(LecturerStore.lecturer);
    } else {
      LecturerStore.updateLecturer(LecturerStore.lecturer.id, LecturerStore.lecturer);
    }
  }

  handleCancel = () => {
    const { LecturerStore } = this.props;

    // get the lecturer id parameter from URL
    const { id } = this.props.match.params;

    // check if it's adding new lecturer or editing existing course
    if (id === 'create') {
      this.props.history.push('/lecturers');
    } else {
      LecturerStore.lecturer = LecturerStore.tempLecturer;
      LecturerStore.lecturerDetailsEditing = false;
    }
  }

  handleConfirmDelete = () => {
    const { LecturerStore } = this.props;

    LecturerStore.deleteLecturer(LecturerStore.lecturer.id).then(() => {
      this.props.history.push('/lecturers');
    });
  }

  render() {
    return <LecturerDetailsView
      handleInputChange={this.handleInputChange}
      handleEdit={this.handleEdit}
      handleCancel={this.handleCancel}
      handleConfirmDelete={this.handleConfirmDelete}
      handleSubmit={this.handleSubmit} />
  }
}

export default withRouter(LecturerDetailsContainer);
