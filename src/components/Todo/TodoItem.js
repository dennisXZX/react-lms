import React, { Component } from 'react';
import classnames from 'classnames';

class TodoItem extends Component {
  render() {
    const { todo } = this.props;

    return (
      <li className={classnames('list-group-item todo-item', { 'todo-item--completed': todo.completed })}>
        <div className="todo-item__name">{todo.name}</div>
        <div className="todo-item__check">
          <i className="fa fa-check" />
        </div>
        <div className="todo-item__trash">
          <i className="fa fa-trash" />
        </div>
      </li>
    );
  }
}

export default TodoItem;