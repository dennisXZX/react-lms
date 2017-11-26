import axios from 'axios';

export const getAllTodos = () => {
  return axios.get('/api/todos');
}

export const getTodo = (id) => {
  return axios.get(`/api/todos/${id}`);
}

export const deleteTodo = (id) => {
  return axios.delete(`/api/todos/${id}`);
}

export const createTodo = (todo) => {
  return axios.post('/api/todos', todo);
}

export const updateTodo = (id, todo) => {
  return axios.put(`/api/todos/${id}`, todo);
}