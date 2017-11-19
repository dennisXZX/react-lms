import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../UI/Button';
import Confirm from 'react-confirm-bootstrap';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Gravatar from '../UI/Gravatar';
import Spinner from '../UI/Spinner';
import { statusCodeToError } from '../../utils';

class StudentDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      error: '',
      student: null,
    };
  }

  componentDidMount() {
    this.loadStudent();
  }

  loadStudent() {
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.setState({ student: {}, isEditing: true });
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
    axios.get(`/api/students/${id}`).then(onSuccess).catch(onFail);
  }

  /*
  * Event handlers
  * */

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

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

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ isSaving: true });
    const { student } = this.state;
    const onSuccess = (response) => {
      this.student = response.data;
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
    const { id } = this.props.match.params;
    if (id === 'create') {
      this.props.history.push('/students');
    } else {
      this.setState({
        student: this.student,
        isEditing: false,
      });
    }
  }

  handleConfirmDelete = () => {
    const { student } = this.state;

    this.setState({ isDeleting: true });
    axios.delete(`/api/students/${student.id}`)
      .then(() => {
        this.props.history.push('/students');
      });
  }

  /*
  * Render helper methods
  * */

  renderDisplay = () => {
    const { student, isDeleting } = this.state;

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
            disabled={isSaving}
          >
            Save
          </Button>
          <Button
            onClick={this.handleCancel}
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
    const { isLoading, student, error, isEditing } = this.state;

    if (isLoading) {
      return (
        <DetailsCard>
          <Spinner />
        </DetailsCard>
      );
    }

    if (!isLoading && error) {
      return (
        <DetailsCard>
          <div>{error}</div>
        </DetailsCard>
      );
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
