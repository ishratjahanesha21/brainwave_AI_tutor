import  { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { courseApi } from '../api/courseApi';


export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const { user, isAuthenticated } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseStats, setCourseStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch enrolled courses when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses();
      fetchCourseStats();
    } else {
      setEnrolledCourses([]);
      setCourseStats(null);
    }
  }, [isAuthenticated]);

  // Fetch enrolled courses
  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseApi.getEnrolledCourses();
      setEnrolledCourses(response.enrolledCourses || []);
    } catch (error) {
      console.error('Fetch enrolled courses error:', error);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  // Fetch course statistics
  const fetchCourseStats = async () => {
    try {
      const response = await courseApi.getCourseStats();
      setCourseStats(response.stats);
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  // Enroll in course
  const enrollInCourse = async (courseData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseApi.enrollCourse(courseData);
      setEnrolledCourses(response.enrolledCourses);
      await fetchCourseStats(); // Update stats
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Enrollment failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update course progress
  const updateProgress = async (courseId, conceptId, completed) => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseApi.updateCourseProgress(courseId, {
        conceptId,
        completed,
      });

      // Update local state
      setEnrolledCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.courseId === courseId ? response.course : course
        )
      );

      await fetchCourseStats(); // Update stats
      return { success: true, data: response };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Check if enrolled in course
  const isEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course.courseId === courseId);
  };

  // Get course progress
  const getCourseProgress = (courseId) => {
    return enrolledCourses.find((course) => course.courseId === courseId);
  };

  // Unenroll from course
  const unenrollFromCourse = async (courseId) => {
    try {
      setLoading(true);
      const response = await courseApi.unenrollCourse(courseId);
      setEnrolledCourses(response.enrolledCourses);
      await fetchCourseStats();
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Unenroll failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    enrolledCourses,
    courseStats,
    loading,
    error,
    enrollInCourse,
    updateProgress,
    isEnrolled,
    getCourseProgress,
    unenrollFromCourse,
    refreshCourses: fetchEnrolledCourses,
    refreshStats: fetchCourseStats,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};