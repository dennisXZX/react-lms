import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class WelcomeView extends Component {
   data = {
    datasets: [{
      data: [40, 20]
    }],
    labels: [
      'Male',
      'Female'
    ],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)'
    ],
     borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)'
     ],
     borderWidth: 1
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="row chart">
          <div className="col-sm-6 text-center">
            <Pie
              data={this.data}
              width={300}
              height={300}
              options={{
                maintainAspectRatio: false
              }} />
          </div>
          <div className="col-sm-6 text-center">.col-md-6</div>
        </div>
      </div>
    );
  }
}

export default WelcomeView;