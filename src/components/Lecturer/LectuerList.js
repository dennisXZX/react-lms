import React, { Component } from 'react';
import LecturerItem from './LecturerItem';
import { inject, observer } from 'mobx-react';

@inject('LecturerStore')
@observer
class LectuerList extends Component {
  render() {
    const { LecturerStore } = this.props;

    return (
      <ul className="list-group">
        {LecturerStore.filteredLecturers.map(lecturer => (
          <LecturerItem lecturer={lecturer} key={lecturer.id} />
        ))}
      </ul>
    )
  }
}

export default LectuerList;