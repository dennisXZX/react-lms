import React, { Component } from 'react';
import CourseCard from './CourseCard';
import { inject, observer } from 'mobx-react';

@inject('CourseStore')
@observer
class CourseList extends Component {
  render() {
    const { CourseStore } = this.props;

    return (
      <div className="row">
        {CourseStore.filteredCourses.map(
          course => <CourseCard course={course} key={course.id} />
        )}
      </div>
    )
  }
}

export default CourseList;