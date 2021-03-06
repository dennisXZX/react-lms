import { observable, action, computed } from 'mobx';

import {
  getAllStudents, getStudent, deleteStudent, createStudent, updateStudent
} from '../api/studentApi';

import { statusCodeToError } from '../utils';

class StudentStore {

  @observable studentsListLoading = false;
  @observable students = [];
  @observable filter = '';
  @observable studentDetailsLoading = false;
  @observable studentDetailsEditing = false;
  @observable studentDetailsSaving = false;
  @observable error = '';
  @observable student = null;
  @observable tempStudent = null;
  @observable maleCount = 0;
  @observable femaleCount = 0;
  @observable totalStudentCount = 0;

  @action getAllStudents() {
    getAllStudents().then((response) => {
      this.students = response.data;
      this.studentsListLoading = false;
    })
  }

  @action getStudent(id) {
    const onSuccess = (response) => {
      // save a copy so when user clicks cancel we can revert all changes
      this.tempStudent = response.data;
      // update the student
      this.student = response.data;
      this.studentDetailsLoading = false;
    };

    const onFail = (error) => {
        this.student = null;
        this.error = statusCodeToError(error.response.status);
        this.studentDetailsLoading = false;
    };

    getStudent(id)
      .then(onSuccess)
      .catch(onFail);
  }

  @action createStudent(student) {

    const onSuccess = (response) => {
      // update the student state with the data from API call
      // set the isEditing to false to exit editing mode
      this.studentDetailsEditing = false;
      this.studentDetailsSaving = false;
      this.student = response.data;
    };

    createStudent(student)
      .then(onSuccess);
  }

  @action updateStudent(id, student) {
    const onSuccess = (response) => {
      // save a copy so when user clicks cancel we can revert all changes
      this.tempStudent = response.data;

      // update the student state with the data from API call
      // set the isEditing to false to exit editing mode
      this.studentDetailsEditing = false;
      this.studentDetailsSaving = false;
      this.student = response.data;
    };

    updateStudent(id, student)
      .then(onSuccess);
  }

  @action deleteStudent(id) {
    return deleteStudent(id);
  }

  @action countStudent() {
    // reset the counts
    this.maleCount = 0;
    this.femaleCount = 0;
    this.totalStudentCount = 0;

    getAllStudents().then((response) => {
      // iterate through the student array to calculate gender counts
      response.data.forEach((student) => {
        student.gender === 'm' ? this.maleCount += 1 : this.femaleCount += 1;
        this.totalStudentCount += 1;
      })
    });
  }

  @computed get filteredStudents() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.students.filter((student) => {
      const fullName = student.first_name + ' ' + student.last_name;
      return !this.filter || matchesFilter.test(fullName);
    });
  }

  @computed get studentCount() {
    return this.filteredStudents.length;
  }

}

const store = new StudentStore();

export default store;