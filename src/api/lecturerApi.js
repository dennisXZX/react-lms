import axios from 'axios';

export const getAllLecturers = () => {
  return axios.get('/api/lecturers');
}

export const getLecturer = (id) => {
  return axios.get(`/api/lecturers/${id}`);
}

export const deleteLecturer = (id) => {
  return axios.delete(`/api/lecturers/${id}`);
}

export const createLecturer = (lecturer) => {
  return axios.post('/api/lecturers', lecturer);
}

export const updateLecturer = (id, lecturer) => {
  return axios.put(`/api/lecturers/${id}`, lecturer);
}