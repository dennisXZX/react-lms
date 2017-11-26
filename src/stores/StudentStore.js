import { observable, action, computed } from 'mobx';

import { getAllStudents } from '../api/studentApi';

class StudentStore {
  @observable studentsViewLoading = false;
  @observable students = [];
  @observable filter = '';

  @action loadStudents() {
    getAllStudents().then((response) => {
      this.students = response.data;
      this.studentsViewLoading = false;
    })
  }

  @computed get filteredStudents() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.students.filter((student) => {
      const fullName = student.first_name + ' ' + student.last_name;
      return !this.filter || matchesFilter.test(fullName);
    });
  }

  @computed get studentCount() {
    return this.students.length;
  }
}

const store = new StudentStore();

export default store;