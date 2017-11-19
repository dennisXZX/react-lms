import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// component
import Button from '../UI/Button';
import DetailsCard from '../UI/DetailsCard';
import DisplayField from '../UI/DisplayField';
import Spinner from '../UI/Spinner';
import Confirm from 'react-confirm-bootstrap';

// utility library
import { statusCodeToError } from '../../utils';

class CourseDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditing: false,
      isSaving: false,
      error: '',
      course: null,
    };
  }

  /*
  * components life cycle methods
  * */

  componentDidMount() {
    this.loadCourse();
  }

  /*
  * Helper methods
  * */

  // helper method to load a course with the id
  loadCourse = () => {
    // retrieve the course id from URL
    const { id } = this.props.match.params;

    // return a form interface if it's on a 'create' route
    if (id === 'create') {
      this.setState({
        course: {},
        isEditing: true
      });

      return;
    }

    this.setState({ isLoading: true, error: '' });

    const onSuccess = (response) => {
      this.course = response.data;
      this.setState({
        course: response.data,
        isLoading: false,
      });
    };

    const onFail = (error) => {
      this.setState({
        course: null,
        error: statusCodeToError(error.response.status),
        isLoading: false,
      });
    };

    axios.get(`/api/courses/${id}`)
      .then(onSuccess)
      .catch(onFail);
  }

  /*
  * Event handlers
  * */

  handleInputChange = (event) => {
    // get a reference to the object that dispatched the event
    const target = event.target;
    // get the value from the node
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // store the value into state
    this.setState({
      course: {
        ...this.state.course,
        [name]: value,
      },
    });
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleCancel = () => {
    // get the course id parameter from URL
    const { id } = this.props.match.params;

    // check if it's adding new course or editing existing course
    if (id === 'create') {
      this.props.history.push('/courses');
    } else {
      this.setState({
        isEditing: false
      });
    }
  }

  handleConfirmDelete = () => {
    const { course } = this.state;

    this.setState({ isDeleting: true });
    axios.delete(`/api/courses/${course.id}`)
      .then(() => {
        this.props.history.push('/courses');
      });
  }

  handleSubmit = (event) => {
    // prevent the default submit action
    event.preventDefault();

    this.setState({ isSaving: true });

    const { course } = this.state;

    // callback function on fulfilled promise
    const onSuccess = (response) => {
      // update the course state with the data from API call
      // set the isEditing to false to exit editing mode
      this.setState({
        isEditing: false,
        isSaving: false,
        course: response.data,
      });
    };

    if (this.props.match.params.id === 'create') {
      axios.post('/api/courses', course)
        .then(onSuccess);
    } else {
      axios.put(`/api/courses/${course.id}`, course)
        .then(onSuccess);
    }

  }

  /*
  * Render helper methods
  * */

  renderSpinner = () => {
    return (
      <DetailsCard>
        <Spinner />
      </DetailsCard>
    )
  }

  renderError = () => {
    return (
      <DetailsCard>
        {this.state.error}
      </DetailsCard>
    )
  }

  renderDisplay = () => {
    const { course } = this.state;

    return (
      <DetailsCard>
        <DetailsCard.Header>
          <h1>{course.name}</h1>
          <DetailsCard.ButtonGroup>
            <Button
              primary
              onClick={this.handleEdit}
              style={{ marginRight: 10 }}>
              Edit
            </Button>
            <Confirm
              onConfirm={this.handleConfirmDelete}
              body="Are you sure you want to delete this course?"
              confirmText="Confirm Delete"
              title="Deleting Course">
              <Button danger>Delete</Button>
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
    const { course, isSaving } = this.state;

    return (
      <DetailsCard>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={course.name || ''}
              name="name"
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
              style={{ height: 100 }}
              id="introduction"
            />
          </div>
          <Button
            primary
            type="submit"
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
    const { isLoading, course, error, isEditing } = this.state;

    // render a loading spinner
    if (isLoading) {
      return this.renderSpinner();
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

export default withRouter(CourseDetailsView);