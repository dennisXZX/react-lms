import React, { Component } from 'react';
import StudentItem from './StudentItem';
import { inject, observer } from 'mobx-react';

@inject('StudentStore')
@observer
class StudentList extends Component {
  render() {
    const { StudentStore } = this.props;

    return (
      <ul className="list-group">
        {StudentStore.filteredStudents.map(student => (
          <StudentItem student={student} key={student.id} />
        ))}
      </ul>
    )
  }
}

export default StudentList;