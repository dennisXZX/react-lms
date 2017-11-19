import axios from 'axios';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import StudentItem from './StudentItem';
import Spinner from '../UI/Spinner';

@inject('StudentStore')
@observer
class StudentsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents = () => {
    const { StudentStore } = this.props;

    this.setState({ isLoading: true });

    axios.get('/api/students').then((response) => {
      StudentStore.loadStudents(response.data);

      this.setState({
        isLoading: false
      });
    });
  }

  /*
  * Event handlers
  * */

  handleSearchInputChange = (event) => {
    // update the filter property in store
    this.props.StudentStore.filter = event.target.value;
  }

  /*
  * Render helper methods
  * */

  renderStudentItem = () => {
    const { StudentStore } = this.props;

    return (
      <ul className="list-group">
        {StudentStore.filteredStudents.map(student => (
          <StudentItem student={student} key={student.id} />
        ))}
      </ul>
    )
  }

  render() {
    const { StudentStore } = this.props;

    return (
      <div>
        <h1 className="title">Students ({StudentStore.studentCount} in Total)</h1>
        <div className="row" style={{ margin: '20px 0' }}>
          <div className="col-sm-6" style={{ padding: '0' }}>
            <Link to="/students/create" className="btn btn-primary">
              Add new student
            </Link>
          </div>
          <div className="col-sm-6" style={{ padding: "0" }}>
            <input
              value={StudentStore.filter}
              onChange={this.handleSearchInputChange}
              style={{ paddingLeft: "10px", width: "230px"}}
              className="pull-right"
              type="text"
              placeholder="Search a student by name" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            {this.state.isLoading ? <Spinner /> : this.renderStudentItem()}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentsView;
