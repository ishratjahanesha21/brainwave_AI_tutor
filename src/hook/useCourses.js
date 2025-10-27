import { useContext } from 'react';
import { CourseContext } from '../context/courseContext';


export const useCourses = () => {
  const context = useContext(CourseContext);
  
  if (!context) {
    throw new Error('useCourses must be used within CourseProvider');
  }
  
  return context;
};