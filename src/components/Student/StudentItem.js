import React from 'react';
import { Link } from 'react-router-dom';

import Gravatar from '../UI/Gravatar';

export default function StudentItem({ student, ...rest }) {
  return (
    <div className="list-group-item student-item-wrapper" {...rest}>
      <Link to={`/students/${student.id}`}>
      <div className="student-item">
        <Gravatar email={student.email} size={50} />
        <div style={{ flex: 1 }}>
          <div className="student-item-text">
            <div style={{ flex: 1 }}>
              <span className="student-item-name">{student.first_name} {student.last_name}</span>
              <span className="student-item-email">
                <i className="fa fa-envelope-o" /> {student.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}
