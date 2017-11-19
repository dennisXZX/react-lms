import { observable, action, computed } from 'mobx';

class StudentStore {
  @observable students = [];
  @observable filter = '';

  @action loadStudents(students) {
    this.students = students;
  }

  @computed get filteredStudents() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.students.filter((student) => {
      const fullName = student.first_name + student.last_name
      return !this.filter || matchesFilter.test(fullName);
    });
  }

  @computed get studentCount() {
    return this.students.length;
  }
}

const store = new StudentStore();

export default store;