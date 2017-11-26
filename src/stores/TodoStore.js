import { observable, action, computed } from 'mobx';

class TodoStore {
  @observable todos = [];
  @observable filter = '';

  @action loadTodos(todos) {
    this.todos = todos;
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