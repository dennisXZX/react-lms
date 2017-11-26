import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('TodoStore')
@observer
class TodoInput extends Component {
  constructor() {
    super();

    this.state = {
      newItemName: ''
    }
  }

  handleNewItemNameChange = (event) => {
    const name = event.target.value;

    this.setState({
      newItemName: name
    })
  }

  handleSubmit = (event) => {

    const { TodoStore } = this.props;

    event.preventDefault();

    const newItemName = this.state.newItemName.trim();

    // create an item through API
    TodoStore.addTodo({
      name: newItemName,
      completed: 0
    });

  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            value={this.state.newItemName}
            onChange={this.handleNewItemNameChange}
            placeholder="What are you gonna do next"
            className="form-control"
          />
          <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">Add item</button>
          </span>
        </div>
      </form>
    )
  }
}

export default TodoInput;