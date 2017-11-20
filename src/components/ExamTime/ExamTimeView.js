import React, { Component } from 'react';

import TimeClock from './TimeClock';

class ExamTimeView extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <TimeClock />
      </div>
    )
  }
}

export default ExamTimeView;