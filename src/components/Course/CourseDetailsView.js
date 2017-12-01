import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Button from '../UI/Button';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Spinner from '../UI/Spinner';
import Confirm from 'react-confirm-bootstrap';

@inject('CourseStore')
@observer
class CourseDetailsView extends Component {

  renderError = () => {
    const { CourseStore } = this.props;

    return (
      <DetailsCard>
        {CourseStore.error}
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { CourseStore } = this.props;
    const { handleEdit, handleConfirmDelete } = this.props;

    return (
      <DetailsCard>
        <div className="row go-back">
          <div className="col-sm-12">
            <Link to="/courses">Back</Link>
          </div>
        </div>
        <DetailsCard.Header>
          <h1>{CourseStore.course.name}</h1>
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

        <DisplayField label="Code">{CourseStore.course.code}</DisplayField>
        <DisplayField label="Start at">{CourseStore.course.start_at}</DisplayField>
        <DisplayField label="End at">{CourseStore.course.end_at}</DisplayField>
        <DisplayField label="Introduction">{CourseStore.course.introduction}</DisplayField>
      </DetailsCard>
    );
  }

  renderForm = () => {
    const { CourseStore } = this.props;

    const { handleSubmit, handleInputChange, handleCancel } = this.props;

    return (
      <DetailsCard>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={CourseStore.course.name || ''}
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
              value={CourseStore.course.code || ''}
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
              value={CourseStore.course.start_at || ''}
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
              value={CourseStore.course.end_at || ''}
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
              value={CourseStore.course.introduction || ''}
              name="introduction"
              onChange={handleInputChange}
              style={{ height: 100 }}
              id="introduction"
            />
          </div>
          <Button
            buttonStyle="primary"
            type="submit"
            disabled={CourseStore.courseDetailsSaving}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disabled={CourseStore.courseDetailsSaving}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { CourseStore } = this.props;

    // render a loading spinner
    if (CourseStore.courseDetailsLoading) {
      return <Spinner />;
    }

    // render an error message
    if (!CourseStore.courseDetailsLoading && CourseStore.error) {
      return this.renderError();
    }

    // render the course detail if it's not in editing mode
    if (CourseStore.course && !CourseStore.courseDetailsEditing) {
      return this.renderDisplay();
    }

    // render a form if it's in editing mode
    if (CourseStore.course && CourseStore.courseDetailsEditing) {
      return this.renderForm();
    }

    return null;
  }
}

export default CourseDetailsView;