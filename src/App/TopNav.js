import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse bg-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">Jiangren</Link>
          </div>

          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/students">Students</Link>
              </li>
              <li>
                <Link to="/lecturers">Lecturers</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default TopNav;