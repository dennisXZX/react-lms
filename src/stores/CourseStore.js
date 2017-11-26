import { observable, action, computed } from 'mobx';

import { getAllCourses } from '../api/courseApi';

class CourseStore {
  @observable courseViewLoading = false;
  @observable courses = [];
  @observable filter = '';

  @action loadCourses() {
    // get all the courses from API
    getAllCourses().then((response) => {
      this.courses = response.data;
      this.courseViewLoading = false;
    });
  }

  @computed get filteredCourses() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.courses.filter((course) => {
      return !this.filter || matchesFilter.test(course.name);
    });
  }

  @computed get courseCount() {
    return this.courses.length;
  }
}

const store = new CourseStore();

export default store;