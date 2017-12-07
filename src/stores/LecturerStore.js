import { observable, action, computed } from 'mobx';

import {
  getAllLecturers, getLecturer, deleteLecturer, createLecturer, updateLecturer
} from '../api/lecturerApi';

import { statusCodeToError } from '../utils';

class LecturerStore {

  @observable lecturersListLoading = false;
  @observable lecturers = [];
  @observable filter = '';
  @observable lecturerDetailsLoading = false;
  @observable lecturerDetailsEditing = false;
  @observable lecturerDetailsSaving = false;
  @observable error = '';
  @observable lecturer = null;
  @observable tempLecturer = null;

  @action getAllLecturers() {
    this.getAllLecturers().then((response) => {
      this.lecturers = response.data;
      this.lecturersListLoading = false;
    })
  }

  @action getLecturer(id) {
    const onSuccess = (response) => {
      // save a copy so when user clicks cancel we can revert all changes
      this.tempLecturer = response.data;
      // update the student
      this.lecturer = response.data;
      this.lecturerDetailsLoading = false;
    };

    const onFail = (error) => {
      this.lecturer = null;
      this.error = statusCodeToError(error.response.status);
      this.lecturerDetailsLoading = false;
    };

    getLecturer(id)
      .then(onSuccess)
      .catch(onFail);
  }

  @action createLecturer(lecturer) {

    const onSuccess = (response) => {
      // update the lecturer state with the data from API call
      // set the isEditing to false to exit editing mode
      this.lecturerDetailsEditing = false;
      this.lecturerDetailsSaving = false;
      this.lecturer = response.data;
    };

    createLecturer(lecturer)
      .then(onSuccess);
  }

  @action updateLecturer(id, lecturer) {
    const onSuccess = (response) => {
      // save a copy so when user clicks cancel we can revert all changes
      this.tempLecturer = response.data;

      // update the lecturer state with the data from API call
      // set the isEditing to false to exit editing mode
      this.lecturerDetailsEditing = false;
      this.lecturerDetailsSaving = false;
      this.lecturer = response.data;
    };

    updateLecturer(id, lecturer)
      .then(onSuccess);
  }

  @action deleteLecturer(id) {
    return deleteLecturer(id);
  }

  @computed get filteredLecturers() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.lecturers.filter((lecturer) => {
      const fullName = lecturer.first_name + ' ' + lecturer.last_name;
      return !this.filter || matchesFilter.test(fullName);
    });
  }

  @computed get lecturerCount() {
    return this.lecturers.length;
  }

}

const store = new LecturerStore();

export default store;