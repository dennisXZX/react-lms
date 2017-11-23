import axios from 'axios';

export const getAllStudents = () => {
  return axios.get('/api/students');
}

export const getStudent = (id) => {
  return axios.get(`/api/students/${id}`);
}

export const deleteStudent = (id) => {
  return axios.delete(`/api/students/${id}`);
}

export const createStudent = (student) => {
  return axios.post('/api/students', student);
}

export const updateStudent = (id, student) => {
  return axios.put(`/api/students/${id}`, student);
}