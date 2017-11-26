import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import StudentList from './StudentList';
import StudentsViewHeader from './StudentsViewHeader';
import Spinner from '../UI/Spinner';

@inject('StudentStore')
@observer
class StudentsView extends Component {

  componentDidMount() {
    this.loadStudents();
  }

  loadStudents = () => {
    const { StudentStore } = this.props;

    StudentStore.studentsViewLoading = true;

    StudentStore.loadStudents();
  }

  render() {
    const { studentsViewLoading } = this.props.StudentStore;

    return (
      <div>
        <StudentsViewHeader />
        {studentsViewLoading ? <Spinner /> : <StudentList />}
      </div>
    );
  }
}

export default StudentsView;
