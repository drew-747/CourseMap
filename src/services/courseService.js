import { useApi } from '../hooks/useApi';

export const useCourseService = () => {
  const api = useApi();

  const getCourses = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/courses?${queryString}`);
  };

  const getCourseById = async (courseId) => {
    return api.get(`/courses/${courseId}`);
  };

  const createCourse = async (courseData) => {
    return api.post('/courses', courseData);
  };

  const updateCourse = async (courseId, courseData) => {
    return api.put(`/courses/${courseId}`, courseData);
  };

  const deleteCourse = async (courseId) => {
    return api.del(`/courses/${courseId}`);
  };

  const enrollInCourse = async (courseId) => {
    return api.post(`/courses/${courseId}/enroll`);
  };

  const unenrollFromCourse = async (courseId) => {
    return api.post(`/courses/${courseId}/unenroll`);
  };

  const getEnrolledCourses = async () => {
    return api.get('/courses/enrolled');
  };

  const getCourseModules = async (courseId) => {
    return api.get(`/courses/${courseId}/modules`);
  };

  const getCourseProgress = async (courseId) => {
    return api.get(`/courses/${courseId}/progress`);
  };

  const updateCourseProgress = async (courseId, moduleId, progress) => {
    return api.put(`/courses/${courseId}/progress`, { moduleId, progress });
  };

  const searchCourses = async (query) => {
    return api.get(`/courses/search?q=${encodeURIComponent(query)}`);
  };

  const getRecommendedCourses = async () => {
    return api.get('/courses/recommended');
  };

  return {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    unenrollFromCourse,
    getEnrolledCourses,
    getCourseModules,
    getCourseProgress,
    updateCourseProgress,
    searchCourses,
    getRecommendedCourses,
  };
}; 