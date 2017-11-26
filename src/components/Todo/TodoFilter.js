import React, { Component } from 'react';

class TodoFilter extends Component {
  render() {
    return (
      <div className="todo-filter">
        <label className="radio-inline">
          <input
            type="radio"
            name="filter"
            value="all"
          /> All
        </label>
        <label className="radio-inline">
          <input
            type="radio"
            name="filter"
            value="pending"
          /> Pending
        </label>
        <label className="radio-inline">
          <input
            type="radio"
            name="filter"
            value="completed"
          /> Completed
        </label>
      </div>
    )
  }
}

export default TodoFilter;