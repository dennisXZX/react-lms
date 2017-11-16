import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="col-sm-6 col-md-3">
      <div className="thumbnail jr-course-card">
        <div className="caption">
          <h4 className="jr-course-card__name">{course.name}</h4>
          <p className="jr-course-card__code">{course.code}</p>
          <p className="jr-course-card__introduction">{course.introduction}</p>
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