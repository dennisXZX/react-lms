import { observable, action, computed } from 'mobx';

import { createTodoAPI } from '../api/todoApi';

class TodoStore {
  @observable todos = [];
  @observable filter = '';

  @action loadTodos(todos) {
    this.todos = todos;
  }

  @action addTodo(todo) {
    createTodoAPI(todo)
      .then((response) => {
        this.todos.push(response.data);
      })
  }

  @computed get filteredTodos() {
    const matchesFilter = new RegExp(this.filter, "i");

    return this.todos.filter((todo) => {
      return !this.filter || matchesFilter.test(todo.name);
    });
  }

  @computed get todoCount() {
    return this.todos.length;
  }
}

const store = new TodoStore();

export default store;