import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import LectuerList from './LectuerList';
import LectuersViewHeader from './LectuersViewHeader';
import Spinner from '../UI/Spinner';

@inject('LecturerStore')
@observer
class LecturersView extends Component {

  componentDidMount() {
    this.loadLecturers();
  }

  loadLecturers = () => {
    const { LecturerStore } = this.props;

    LecturerStore.lecturersListLoading = true;

    LecturerStore.getAllLecturers();
  }

  render() {
    const { lecturersListLoading } = this.props.LecturerStore;

    return (
      <div>
        <LectuersViewHeader />
        {lecturersListLoading ? <Spinner /> : <LectuerList />}
      </div>
    );
  }
}

export default LecturersView;
