import React, { Component } from 'react';
import moment from 'moment-timezone';

import TimeSquare from './TimeSquare';

class TimeClock extends Component {
  constructor() {
    super();

    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  updateTime = () => {
    this.timeID = setInterval(() => {
      this.setState({
        time: new Date()
      });
    });
  }

  render() {
    const { time } = this.state;
    const { city } = this.props;
    const localDateTime = moment(time).tz('Australia/Sydney');
    const hours = localDateTime.format('HH');
    const minutes = localDateTime.format('mm');
    const seconds = localDateTime.format('ss');

    return (
      <div className="clock">
        <div className="clock-date">
          {localDateTime.format("ddd MMM DD YYYY")}
        </div>
        <div className="clock-time">
          <TimeSquare number={hours} />
          <span className="clock-time-colon"> : </span>
          <TimeSquare number={minutes} />
          <span className="clock-time-colon"> : </span>
          <TimeSquare number={seconds} />
        </div>
      </div>
    )
  }
}

export default TimeClock;