import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { truncate } from '../utils';

class CourseCard extends Component {

  // generate a random color
  generateRandomColor = () => {
    const colorLetters = ["B", "C", "D", "E", "F"];
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += colorLetters[Math.floor(Math.random() * colorLetters.length)];
    }
    return color;
  }

  render() {
    const course = this.props.course;
    const randomColor = this.generateRandomColor();

    return (
      <div className="col-sm-6 col-md-3">
        <Link to={`/courses/${course.id}`}>
          <div className="thumbnail course-card" style={{ backgroundColor: randomColor }}>
            <div className="caption">
              <h4 className="course-card-name">{truncate(course.name, 20)}</h4>
              <p className="course-card-code">{truncate(course.code, 30)}</p>
              <p className="course-card-introduction">{truncate(course.introduction, 60)}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default CourseCard;