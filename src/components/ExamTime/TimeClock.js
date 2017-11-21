import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment-timezone';

import TimeSquare from './TimeSquare';

@inject('ExamTimeStore')
@observer
class TimeClock extends Component {

  constructor() {
    super();

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
    const { ExamTimeStore } = this.props;
    // get the current timezone
    const localDateTime = moment(time).tz(ExamTimeStore.currentTimezone);
    const hours = localDateTime.format('HH');
    const minutes = localDateTime.format('mm');
    const seconds = localDateTime.format('ss');

    // retrieve the current timezone and manipulate it
    const [ countryPart, cityPart ] = ExamTimeStore.currentTimezone.split('/');

    return (
      <div className="clock">
        <div className="clock-date">
          {localDateTime.format("ddd MMM DD YYYY")}
        </div>
        <div className="clock-city">{cityPart}, {countryPart} </div>
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