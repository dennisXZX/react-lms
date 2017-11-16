import React from 'react';
import { Link } from 'react-router-dom';

import { truncate } from '../utils';

export default function CourseCard({ course }) {
  return (
    <div className="col-sm-6 col-md-3">
      <div className="thumbnail course-card">
        <div className="caption">
          <h4 className="course-card-name">{truncate(course.name, 20)}</h4>
          <p className="course-card-code">{truncate(course.code, 30)}</p>
          <p className="course-card-introduction">{truncate(course.introduction, 60)}</p>
          <p>
            <Link to={`/courses/${course.id}`} className="btn btn-default">
              Details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}