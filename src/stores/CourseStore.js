import { observable, action, computed } from 'mobx';

class CourseStore {
  @observable courses = [];

  @action addCourses(courses) {
    this.courses = courses;
  }

  @computed get courseCount() {
    return this.courses.length;
  }
}

const store = new CourseStore();

export default store;