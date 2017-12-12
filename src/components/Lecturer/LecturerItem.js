import React from 'react';
import { Link } from 'react-router-dom';

import Gravatar from '../UI/Gravatar';

export default function LecturerItem({ lecturer }) {
  return (
    <div className="list-group-item student-item-wrapper">
      <Link to={`/students/${lecturer.id}`}>
        <div className="student-item">
          {/* avatar */}
          <Gravatar email={lecturer.email} size={40} />
          {/* student name and email */}
          <div style={{ flex: "1 0 0" }}>
            <div className="student-item-text">
              <div style={{ flex: "1 0 0" }}>
                <div className="student-item-name">
                  <i className="fa fa-graduation-cap icon" aria-hidden="true" />
                  {lecturer.first_name} {lecturer.last_name}
                </div>
                <div className="student-item-email" aria-hidden="true">
                  <i className="fa fa-envelope-o icon" />
                  {lecturer.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
