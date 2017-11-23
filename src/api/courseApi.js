import axios from 'axios';

export const getAllCourses = () => {
  return axios.get('/api/courses');
}

export const getCourse = (id) => {
  return axios.get(`/api/courses/${id}`);
}