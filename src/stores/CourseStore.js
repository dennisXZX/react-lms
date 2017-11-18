import { observable, action, computed } from 'mobx';

class CourseStore {
  @observable isLoading = false;
  @observable courses = [];

  @action loadCourses = (courses) => {
    this.courses = courses;
  }

  @action addLoadingSpinner = () => {
    this.isLoading = true;
  }

  @action removeLoadingSpinner = () => {
    this.isLoading = false;
  }

  @computed get courseCount() {
    return this.courses.size;
  }

}

const store = new CourseStore();

export default store;