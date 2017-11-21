import { observable } from 'mobx';

class ExamTimeStore {
  @observable currentTimezone = 'Australia/Sydney';
}

const store = new ExamTimeStore();

export default store;