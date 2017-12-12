import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('LecturerStore')
@observer
class LectuersViewHeader extends Component {

  handleSearchInputChange = (event) => {
    // update the filter property in store
    this.props.LecturerStore.filter = event.target.value;
  }

  render() {
    const { LecturerStore } = this.props;

    return (
      <div>
        <h1 className="title">Lecturers ({LecturerStore.lecturerCount} in Total)</h1>

        <div className="row" style={{ margin: '20px 0' }}>
          {/* Add new lecturer button */}
          <div className="col-sm-6" style={{ padding: '0' }}>
            <Link to="/lecturers/create" className="btn btn-primary">
              Add new lecturer
            </Link>
          </div>

          {/* Search bar */}
          <div className="col-sm-6" style={{ padding: "0" }}>
            <input
              value={LecturerStore.filter}
              onChange={this.handleSearchInputChange}
              style={{ paddingLeft: "10px", width: "230px"}}
              className="pull-right"
              type="text"
              placeholder="Search a lecturer by name" />
          </div>
        </div>
      </div>
    )
  }
}

export default LectuersViewHeader;