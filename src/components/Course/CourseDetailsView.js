import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Spinner from '../UI/Spinner';
import Confirm from 'react-confirm-bootstrap';

class CourseDetailsView extends Component {

  renderError = () => {
    return (
      <DetailsCard>
        {this.state.error}
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { course, handleEdit, handleConfirmDelete } = this.props;

    return (
      <DetailsCard>
        <div className="row go-back">
          <div className="col-sm-12">
            <Link to="/courses">Back</Link>
          </div>
        </div>
        <DetailsCard.Header>
          <h1>{course.name}</h1>
          <DetailsCard.ButtonGroup>
            <Button
              buttonStyle="primary"
              onClick={handleEdit}
              style={{ marginRight: 10 }}>
              Edit
            </Button>
            <Confirm
              onConfirm={handleConfirmDelete}
              body="Are you sure you want to delete this course?"
              confirmText="Confirm Delete"
              title="Deleting Course">
              <Button buttonStyle="danger">Delete</Button>
            </Confirm>
          </DetailsCard.ButtonGroup>
        </DetailsCard.Header>

        <DisplayField label="Code">{course.code}</DisplayField>
        <DisplayField label="Start at">{course.start_at}</DisplayField>
        <DisplayField label="End at">{course.end_at}</DisplayField>
        <DisplayField label="Introduction">{course.introduction}</DisplayField>
      </DetailsCard>
    );
  }

  renderForm = () => {
    const {
      course, isSaving,
      handleSubmit, handleInputChange, handleCancel
    } = this.props;

    return (
      <DetailsCard>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={course.name || ''}
              name="name"
              onChange={handleInputChange}
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Code"
              value={course.code || ''}
              name="code"
              onChange={handleInputChange}
              id="code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-at">Start at</label>
            <input
              type="text"
              className="form-control"
              placeholder="DD/MM/YYYY"
              value={course.start_at || ''}
              name="start_at"
              onChange={handleInputChange}
              id="start-at"
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-at">End at</label>
            <input
              type="text"
              className="form-control"
              placeholder="DD/MM/YYYY"
              value={course.end_at || ''}
              name="end_at"
              onChange={handleInputChange}
              id="end-at"
            />
          </div>
          <div className="form-group">
            <label htmlFor="introduction">Introduction</label>
            <textarea
              className="form-control"
              placeholder="Introduction"
              value={course.introduction || ''}
              name="introduction"
              onChange={handleInputChange}
              style={{ height: 100 }}
              id="introduction"
            />
          </div>
          <Button
            buttonStyle="primary"
            type="submit"
            disabled={isSaving}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isSaving}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { isLoading, course, error, isEditing } = this.props;

    // render a loading spinner
    if (isLoading) {
      return <Spinner />;
    }

    // render an error message
    if (!isLoading && error) {
      return this.renderError();
    }

    // render the course detail if it's not in editing mode
    if (course && !isEditing) {
      return this.renderDisplay();
    }

    // render a form if it's in editing mode
    if (course && isEditing) {
      return this.renderForm();
    }

    return null;
  }
}

export default CourseDetailsView;