import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Button from '../UI/Button';
import Confirm from 'react-confirm-bootstrap';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Gravatar from '../UI/Gravatar';
import Spinner from '../UI/Spinner';
import Label from '../UI/Label';

@inject('StudentStore')
@observer
class StudentDetailsView extends Component {

  renderError = () => {
    const { StudentStore } = this.props;

    return (
      <DetailsCard>
        <div>{StudentStore.error}</div>
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { StudentStore } = this.props;
    const { handleEdit, handleConfirmDelete } = this.props;

    return (
      <DetailsCard>
        <div className="row go-back">
          <div className="col-sm-12">
            <Link to="/students">Back</Link>
          </div>
        </div>
        <DetailsCard.Header>
          <Gravatar email={StudentStore.student.email} />
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

        <DisplayField label="Name">
          {StudentStore.student.first_name} {StudentStore.student.last_name}
        </DisplayField>
        <DisplayField label="Gender">
          {StudentStore.student.gender === 'm' ?
            <i className="fa fa-male fa-lg" aria-hidden="true"></i> :
            <i className="fa fa-female fa-lg" aria-hidden="true"></i>}
        </DisplayField>
        <DisplayField label="Email">
          {StudentStore.student.email}
        </DisplayField>
        <DisplayField label="Courses enrolled" >
          {StudentStore.student.courses !== undefined && StudentStore.student.courses.map((course) => {
            return (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <Label copy={course.name} />
              </Link>
            )
          })}
        </DisplayField>
      </DetailsCard>
    );
  }

  renderForm = () => {
    const { StudentStore } = this.props;
    const { handleSubmit, handleInputChange, handleCancel } = this.props;

    return (
      <DetailsCard>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={StudentStore.student.first_name || ''}
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
              value={StudentStore.student.last_name || ''}
              name="last_name"
              onChange={handleInputChange}
              id="last-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              value={StudentStore.student.gender || ''}
              name="gender"
              onChange={handleInputChange}
              id="gender">
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={StudentStore.student.email || ''}
              name="email"
              onChange={handleInputChange}
              id="email"
            />
          </div>
          <Button
            type="submit"
            buttonStyle="primary"
            disabled={StudentStore.studentDetailsSaving}>
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disabled={StudentStore.studentDetailsSaving}
            style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { StudentStore } = this.props;

    if (StudentStore.studentDetailsLoading) {
      return <Spinner />;
    }

    if (!StudentStore.studentDetailsLoading && StudentStore.error) {
      return this.renderError();
    }

    if (StudentStore.student && !StudentStore.studentDetailsEditing) {
      return this.renderDisplay();
    }

    if (StudentStore.student && StudentStore.studentDetailsEditing) {
      return this.renderForm();
    }

    return null;
  }
}

export default StudentDetailsView;