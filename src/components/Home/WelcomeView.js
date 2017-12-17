import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Pie } from 'react-chartjs-2';

@inject('StudentStore')
@observer
class WelcomeView extends Component {

  componentDidMount() {
    const { StudentStore } = this.props;

    StudentStore.getGenderCount();
  }

  render() {
    const { StudentStore } = this.props;

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

    return (
      <div>
        <div className="row">
          <div className="col-sm-6 text-center">
            <h3>Student Gender Distribution</h3>
            <Pie
              data={genderData} />
          </div>
          <div className="col-sm-6 text-center">.col-md-6</div>
        </div>
      </div>
    );
  }
}

export default WelcomeView;