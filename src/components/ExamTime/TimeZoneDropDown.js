import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment-timezone';

@inject('ExamTimeStore')
@observer
class TimeZoneDropDown extends Component {
  handleChange = (event) => {
    const { ExamTimeStore } = this.props;

    // set the store value
    ExamTimeStore.currentTimezone = event.target.value;
  }

  render() {
    const { ExamTimeStore } = this.props;

    // retrieve timezone list from moment.js
    const timezoneList = moment.tz.names()
      // filter out shorten timezone name such as "CET", and timezone like "Etc/GMT+0"
      .filter((timezone) => {
        return timezone.indexOf('/') >= 0 && timezone.substring(0, 3) !== 'Etc';
      })

    const timezoneOptions = timezoneList.map((timezone) => {
      return (
        <option key={timezone} value={timezone}>
          {timezone}
        </option>
      )
    });

    return (
      <div>
        <ul style={{ padding: '0' }}>
          <select className='form-control'
                  style={{ width: '260px', margin: '0 auto' }}
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