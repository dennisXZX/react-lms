import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Pie } from 'react-chartjs-2';

@inject('HomeStore')
@observer
class WelcomeView extends Component {

  componentDidMount() {
    const { HomeStore } = this.props;

    HomeStore.getGenderCount();
  }

  render() {
    const { HomeStore } = this.props;

    const data = {
      labels: [
        'Male',
        'Female'
      ],
      datasets: [{
        data: [HomeStore.maleCount, HomeStore.femaleCount],
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
              data={data} />
          </div>
          <div className="col-sm-6 text-center">.col-md-6</div>
        </div>
      </div>
    );
  }
}

export default WelcomeView;