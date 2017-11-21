import React, { Component } from 'react';
import moment from 'moment-timezone';

import TimeSquare from './TimeSquare';

class TimeClock extends Component {

  constructor() {
    super();

    // set the exam time 7 hours from now
    // const examTime = new Date().getTime() + (7 * 60 * 60 * 1000);

    this.state = {
      time: new Date().getTime()
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
        time: new Date().getTime()
      })
    }, 1000);
  }

  render() {
    const { time } = this.state;
    const { timezone } = this.props;
    // get the current timezone
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