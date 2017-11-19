import { observable, action, computed } from 'mobx';

class CourseStore {
  @observable courses = [];
  @observable filter = '';

  @action loadCourses(courses) {
    this.courses = courses;
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