import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('CourseStore')
@observer
class CoursesViewHeader extends Component {

  handleSearchInputChange = (event) => {
    // update the filter property in store
    this.props.CourseStore.filter = event.target.value;
  }

  render() {
    const { CourseStore } = this.props;

    return (
      <div>
        <h1>Courses ({CourseStore.courseCount} in total)</h1>

        <div className="row" style={{ margin: '20px 0' }}>
          {/* add new course button */}
          <div className="col-sm-6" style={{ padding: '0' }}>
            <Link to="/courses/create" className="btn btn-primary">
              Add new course
            </Link>
          </div>

          {/* search bar */}
          <div className="col-sm-6" style={{ padding: "0" }}>
            <input
              value={CourseStore.filter}
              onChange={this.handleSearchInputChange}
              style={{ paddingLeft: "10px", width: "230px"}}
              className="pull-right"
              type="text"
              placeholder="Search a course by name" />
          </div>
        </div>
      </div>
    )
  }
}

export default CoursesViewHeader;