import { observable } from 'mobx';
import moment from 'moment-timezone';

class ExamTimeStore {
  @observable currentTimezone = 'Australia/Sydney';

  // generate a random number of days
  numberOfDays = Math.floor(Math.random() * 10) + 1;
  // get the exam day in format '24 Nov 17'
  examTime = moment(new Date()).add(this.numberOfDays, 'days').format("DD MMM YY");
}

const store = new ExamTimeStore();

export default store;