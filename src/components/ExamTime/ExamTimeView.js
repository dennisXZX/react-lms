import React, { Component } from 'react';

import ExamTimeHeader from './ExamTimeHeader';
import TimeClock from './TimeClock';
import TimeZoneDropDown from './TimeZoneDropDown';

class ExamTimeView extends Component {
  render() {
    return (
      <div className="text-center">
        <ExamTimeHeader />
        <TimeClock />
        <TimeZoneDropDown />
      </div>
    )
  }
}

export default ExamTimeView;