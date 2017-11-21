import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// component
import Button from '../UI/Button';
import Confirm from 'react-confirm-bootstrap';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Gravatar from '../UI/Gravatar';
import Spinner from '../UI/Spinner';

// utility library
import { statusCodeToError } from '../../utils';

class StudentDetailsView extends Component {
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

    axios.get(`/api/students/${id}`)
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
      axios.post('/api/students', student)
        .then(onSuccess);
    } else {
      axios.put(`/api/students/${student.id}`, student)
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

    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        this.props.history.push('/students');
      });
  }

  /*
  * Render helper methods
  * */

  renderError = () => {
    return (
      <DetailsCard>
        <div>{this.state.error}</div>
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { student } = this.state;

    return (
      <DetailsCard>
        <DetailsCard.Header>
          <Gravatar email={student.email} />
          <DetailsCard.ButtonGroup>
            <Button
              primary
              style={{ marginRight: 10 }}
              onClick={this.handleEdit}>
              Edit
            </Button>
            <Confirm
              onConfirm={this.handleConfirmDelete}
              body="Are you sure you want to delete this student?"
              confirmText="Confirm Delete"
              title="Deleting Student">
              <Button danger>Delete</Button>
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
    const { student, isSaving } = this.state;

    return (
      <DetailsCard>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={student.first_name || ''}
              name="first_name"
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
              id="email"
            />
          </div>
          <Button
            type="submit"
            primary
            disabled={isSaving}>
            Save
          </Button>
          <Button
            onClick={this.handleCancel}
            disabled={isSaving}
            style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    const { isLoading, student, error, isEditing } = this.state;

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

export default withRouter(StudentDetailsView);
