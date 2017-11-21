import React, { Component } from 'react';

import TimeClock from './TimeClock';
import TimeZoneDropDown from './TimeZoneDropDown';

class ExamTimeView extends Component {
  render() {
    return (
      <div>
        <TimeClock />
        <TimeZoneDropDown />
      </div>
    )
  }
}

export default ExamTimeView;