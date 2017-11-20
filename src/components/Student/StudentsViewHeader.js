import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('StudentStore')
@observer
class StudentsViewHeader extends Component {

  handleSearchInputChange = (event) => {
    // update the filter property in store
    this.props.StudentStore.filter = event.target.value;
  }

  render() {
    const { StudentStore } = this.props;

    return (
      <div>
        <h1 className="title">Students ({StudentStore.studentCount} in Total)</h1>

        <div className="row" style={{ margin: '20px 0' }}>
          {/* Add new student button */}
          <div className="col-sm-6" style={{ padding: '0' }}>
            <Link to="/students/create" className="btn btn-primary">
              Add new student
            </Link>
          </div>

          {/* Search bar */}
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
      </div>
    )
  }
}

export default StudentsViewHeader;