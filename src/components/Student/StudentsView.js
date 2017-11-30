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

    StudentStore.studentsListLoading = true;

    StudentStore.getAllStudents();
  }

  render() {
    const { studentsListLoading } = this.props.StudentStore;

    return (
      <div>
        <StudentsViewHeader />
        {studentsListLoading ? <Spinner /> : <StudentList />}
      </div>
    );
  }
}

export default StudentsView;
