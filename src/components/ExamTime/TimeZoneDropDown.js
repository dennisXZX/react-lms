import React, { Component } from 'react';
import moment from 'moment-timezone';

class TimeZoneDropDown extends Component {
  handleChange = () => {
    console.log('changed');
  }

  render() {
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
                  onChange={this.handleChange}>
            {timezoneOptions}
          </select>
        </ul>
      </div>
    )
  }
}

export default TimeZoneDropDown;