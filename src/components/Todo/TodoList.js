import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class TodoList extends Component {
  render() {
    const { TodoStore } = this.props;

    return (
      <div className="list-group">
        {TodoStore.filteredTodos.map(
          todo => <TodoItem todo={todo} key={todo.id} />
        )}
      </div>
    )
  }
}

export default TodoList;