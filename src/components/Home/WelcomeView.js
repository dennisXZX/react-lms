import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Pie } from 'react-chartjs-2';

@inject("StudentStore", "LecturerStore")
@observer
class WelcomeView extends Component {

  componentDidMount() {
    const { StudentStore, LecturerStore } = this.props;

    StudentStore.countStudent();
    LecturerStore.countLecturer();
  }

  render() {
    const { StudentStore, LecturerStore } = this.props;

    const genderData = {
      labels: [
        'Male',
        'Female'
      ],
      datasets: [{
        data: [StudentStore.maleCount, StudentStore.femaleCount],
        backgroundColor: [
          '#36A2EB',
          '#FF6384'
        ]
      }]
    };

    const studentLecturerData = {
      labels: [
        'Student',
        'Lecturer'
      ],
      datasets: [{
        data: [StudentStore.totalStudentCount, LecturerStore.totalLecturerCount],
        backgroundColor: [
          '#36A2EB',
          '#FF6384'
        ]
      }]
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 text-center">
            <h3>Student Gender Distribution</h3>
            <Pie
              data={genderData} />
          </div>
          <div className="col-sm-6 text-center">
            <h3>Student vs Lecturer</h3>
            <Pie
              data={studentLecturerData} />
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeView;