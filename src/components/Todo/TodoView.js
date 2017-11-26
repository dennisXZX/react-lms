import React, { Component } from 'react';
import Spinner from '../UI/Spinner';
import { inject, observer } from 'mobx-react';

import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

import { getAllTodosAPI } from '../../api/todoApi';

@inject('TodoStore')
@observer
class TodoView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  // helper function to load all todos
  loadTodos = () => {
    const { TodoStore } = this.props;

    this.setState({ isLoading: true });

    const onSuccess = (response) => {
      TodoStore.loadTodos(response.data);
      this.setState({ isLoading: false });
    };

    // fetch all todos
    getAllTodosAPI()
      .then(onSuccess);
  }

  // load courses when the component is successfully mounted
  componentDidMount() {
    this.loadTodos();
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="todo-container">
        <h3>My Todo List</h3>
        <TodoInput />
        <TodoFilter />
        { isLoading ? <Spinner /> : <TodoList /> }
      </div>
    );
  }
}

export default TodoView;