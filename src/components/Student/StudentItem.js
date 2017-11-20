import React from 'react';
import { Link } from 'react-router-dom';

import Gravatar from '../UI/Gravatar';

export default function StudentItem({ student }) {
  return (
    <div className="list-group-item student-item-wrapper">
      <Link to={`/students/${student.id}`}>
        <div className="student-item">
          {/* avatar */}
          <Gravatar email={student.email} size={40} />
          {/* student name and email */}
          <div style={{ flex: "1 0 0" }}>
            <div className="student-item-text">
              <div style={{ flex: "1 0 0" }}>
                <div className="student-item-name">
                  <i className="fa fa-graduation-cap icon" aria-hidden="true" />
                  {student.first_name} {student.last_name}
                </div>
                <div className="student-item-email" aria-hidden="true">
                  <i className="fa fa-envelope-o icon" />
                  {student.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
