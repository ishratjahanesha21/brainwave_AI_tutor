import api from './axios';

export const courseApi = {
  // Enroll in a course
  enrollCourse: async (courseData) => {
    const response = await api.post('/courses/enroll', courseData);
    return response.data;
  },

  // Get enrolled courses
  getEnrolledCourses: async () => {
    const response = await api.get('/courses/enrolled');
    return response.data;
  },

  // Get single course progress
  getCourseProgress: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  // Update course progress
  updateCourseProgress: async (courseId, progressData) => {
    const response = await api.put(`/courses/${courseId}/progress`, progressData);
    return response.data;
  },

  // Get course statistics
  getCourseStats: async () => {
    const response = await api.get('/courses/stats');
    return response.data;
  },

  // Unenroll from course
  unenrollCourse: async (courseId) => {
    const response = await api.delete(`/courses/${courseId}/unenroll`);
    return response.data;
  },
};