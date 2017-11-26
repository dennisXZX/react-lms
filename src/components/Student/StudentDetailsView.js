import React, { Component } from 'react';

import Button from '../UI/Button';
import Confirm from 'react-confirm-bootstrap';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Gravatar from '../UI/Gravatar';
import Spinner from '../UI/Spinner';

class StudentDetailsView extends Component {

  renderError = () => {
    return (
      <DetailsCard>
        <div>{this.state.error}</div>
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { student, handleEdit, handleConfirmDelete } = this.props;

    return (
      <DetailsCard>
        <DetailsCard.Header>
          <Gravatar email={student.email} />
          <DetailsCard.ButtonGroup>
            <Button
              buttonStyle="primary"
              style={{ marginRight: 10 }}
              onClick={handleEdit}>
              Edit
            </Button>
            <Confirm
              onConfirm={handleConfirmDelete}
              body="Are you sure you want to delete this student?"
              confirmText="Confirm Delete"
              title="Deleting Student">
              <Button buttonStyle="danger">Delete</Button>
            </Confirm>
          </DetailsCard.ButtonGroup>
        </DetailsCard.Header>

        <DisplayField label="Name">{student.first_name} {student.last_name}</DisplayField>
        <DisplayField label="Email">{student.email}</DisplayField>
        <DisplayField label="Courses enrolled" />
      </DetailsCard>
    );
  }

  renderForm = () => {
    const {
      student, isSaving,
      handleSubmit, handleInputChange, handleCancel
    } = this.props;

    return (
      <DetailsCard>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={student.first_name || ''}
              name="first_name"
              onChange={handleInputChange}
              id="first-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={student.last_name || ''}
              name="last_name"
              onChange={handleInputChange}
              id="last-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={student.email || ''}
              name="email"
              onChange={handleInputChange}
              id="email"
            />
          </div>
          <Button
            type="submit"
            buttonStyle="primary"
            disabled={isSaving}>
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isSaving}
            style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { isLoading, student, error, isEditing } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    if (!isLoading && error) {
      return this.renderError();
    }

    if (student && !isEditing) {
      return this.renderDisplay();
    }

    if (student && isEditing) {
      return this.renderForm();
    }

    return null;
  }
}

export default StudentDetailsView;