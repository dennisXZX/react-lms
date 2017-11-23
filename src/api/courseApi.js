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

export const createCourse = (course) => {
  return axios.post('/api/courses', course);
}

export const updateCourse = (id, course) => {
  return axios.put(`/api/courses/${id}`, course);
}