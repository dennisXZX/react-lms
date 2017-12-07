import { observable, action, computed } from 'mobx';

import {
  getAllCourses, getCourse, deleteCourse, createCourse, updateCourse
} from '../api/courseApi';

import { statusCodeToError } from '../utils';

class CourseStore {
  @observable courseViewLoading = false;
  @observable courses = [];
  @observable filter = '';
  @observable courseDetailsLoading = false;
  @observable courseDetailsEditing = false;
  @observable courseDetailsSaving = false;
  @observable error = '';
  @observable course = null;
  @observable tempCourse = null;

  @action getAllCourses() {
    // get all the courses from API
    getAllCourses().then((response) => {
      this.courses = response.data;
      this.courseViewLoading = false;
    });
  }

  @action getCourse(id) {
    const onSuccess = (response) => {
      // save a copy so when use clicks cancel we can revert all changes
      this.tempCourse = response.data;
      // update the course
      this.course = response.data;
      this.courseDetailsLoading = false;
    };

    const onFail = (error) => {
      this.course = null;
      this.error = statusCodeToError(error.response.status);
      this.courseDetailsLoading = false;
    };

    getCourse(id)
      .then(onSuccess)
      .catch(onFail);
  }

  @action createCourse(course) {

    const onSuccess = (response) => {
      // update the course state with the data from API call
      // set the isEditing to false to exit editing mode
      this.courseDetailsEditing = false;
      this.courseDetailsSaving = false;
      this.course = response.data;
    };

    createCourse(course)
      .then(onSuccess);
  }

  @action updateCourse(id, course) {
    const onSuccess = (response) => {
      // save a copy so when use clicks cancel we can revert all changes
      this.tempCourse = response.data;

      // update the course state with the data from API call
      // set the isEditing to false to exit editing mode
      this.courseDetailsEditing = false;
      this.courseDetailsSaving = false;
      this.course = response.data;
    };

    updateCourse(id, course)
      .then(onSuccess);
  }

  @action deleteCourse(id) {
    return deleteCourse(id);
  }

  @computed get filteredCourses() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.courses.filter((course) => {
      return !this.filter || matchesFilter.test(course.name);
    });
  }

  @computed get courseCount() {
    return this.filteredCourses.length;
  }
}

const store = new CourseStore();

export default store;