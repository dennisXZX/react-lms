import axios from 'axios';

export const getAllCourses = () => {
  return axios.get('/api/courses');
}

export const getCourse = (id) => {
  return axios.get(`/api/courses/${id}`);
}

export const deleteCourse = (id) => {
  return axios.delete(`/api/courses/${id}`);
}