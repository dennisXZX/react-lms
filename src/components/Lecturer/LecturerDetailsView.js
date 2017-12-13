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

@inject('LecturerStore')
@observer
class LecturerDetailsView extends Component {

  renderError = () => {
    const { LecturerStore } = this.props;

    return (
      <DetailsCard>
        <div>{LecturerStore.error}</div>
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { LecturerStore } = this.props;
    const { handleEdit, handleConfirmDelete } = this.props;

    return (
      <DetailsCard>
        <div className="row go-back">
          <div className="col-sm-12">
            <Link to="/lecturers">Back</Link>
          </div>
        </div>
        <DetailsCard.Header>
          <Gravatar email={LecturerStore.lecturer.email} />
          <DetailsCard.ButtonGroup>
            <Button
              buttonStyle="primary"
              style={{ marginRight: 10 }}
              onClick={handleEdit}>
              Edit
            </Button>
            <Confirm
              onConfirm={handleConfirmDelete}
              body="Are you sure you want to delete this lecturer?"
              confirmText="Confirm Delete"
              title="Deleting Lecturer">
              <Button buttonStyle="danger">Delete</Button>
            </Confirm>
          </DetailsCard.ButtonGroup>
        </DetailsCard.Header>

        <DisplayField label="Name">
          {LecturerStore.lecturer.first_name} {LecturerStore.lecturer.last_name}
        </DisplayField>
        <DisplayField label="Gender">
          {LecturerStore.lecturer.gender === 'm' ?
            <i className="fa fa-male fa-lg" aria-hidden="true"></i> :
            <i className="fa fa-female fa-lg" aria-hidden="true"></i>}
        </DisplayField>
        <DisplayField label="Email">
          {LecturerStore.lecturer.email}
        </DisplayField>
        <DisplayField label="Courses enrolled" >
          {LecturerStore.lecturer.courses && LecturerStore.lecturer.courses.map((course) => {
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
    const { LecturerStore } = this.props;
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
              value={LecturerStore.lecturer.first_name || ''}
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
              value={LecturerStore.lecturer.last_name || ''}
              name="last_name"
              onChange={handleInputChange}
              id="last-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              value={LecturerStore.lecturer.gender || ''}
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
              value={LecturerStore.lecturer.email || ''}
              name="email"
              onChange={handleInputChange}
              id="email"
            />
          </div>
          <Button
            type="submit"
            buttonStyle="primary"
            disabled={LecturerStore.lecturerDetailsSaving}>
            Save
          </Button>
          <Button
            onClick={handleCancel}
            disabled={LecturerStore.lecturerDetailsSaving}
            style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { LecturerStore } = this.props;

    if (LecturerStore.lecturerDetailsLoading) {
      return <Spinner />;
    }

    if (!LecturerStore.lecturerDetailsLoading && LecturerStore.error) {
      return this.renderError();
    }

    if (LecturerStore.lecturer && !LecturerStore.lecturerDetailsEditing) {
      console.log('render display');

      return this.renderDisplay();
    }

    if (LecturerStore.lecturer && LecturerStore.lecturerDetailsEditing) {
      console.log('render form');

      return this.renderForm();
    }

    return null;
  }
}

export default LecturerDetailsView;