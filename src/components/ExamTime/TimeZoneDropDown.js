import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment-timezone';

@inject('ExamTimeStore')
@observer
class TimeZoneDropDown extends Component {
  handleChange = (event) => {
    const { ExamTimeStore } = this.props;

    ExamTimeStore.currentTimezone = event.target.value;
    console.log(ExamTimeStore.currentTimezone);
  }

  render() {
    const { ExamTimeStore } = this.props;
    const timezoneList = moment.tz.names();

    const timezoneOptions = timezoneList.map((timezone) => {
      return (
        <option key={timezone} value={timezone}>
          {timezone}
        </option>
      )
    });

    return (
      <div>
        <ul>
          <select className='form-control'
                  onChange={this.handleChange}
                  value={ExamTimeStore.currentTimezone}>
            {timezoneOptions}
          </select>
        </ul>
      </div>
    )
  }
}

export default TimeZoneDropDown;