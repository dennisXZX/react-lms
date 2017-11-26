import axios from 'axios';

export const getAllTodosAPI = () => {
  return axios.get('/api/todos');
}

export const getTodoAPI = (id) => {
  return axios.get(`/api/todos/${id}`);
}

export const deleteTodoAPI = (id) => {
  return axios.delete(`/api/todos/${id}`);
}

export const createTodoAPI = (todo) => {
  return axios.post('/api/todos', todo);
}

export const updateTodoAPI = (id, todo) => {
  return axios.put(`/api/todos/${id}`, todo);
}