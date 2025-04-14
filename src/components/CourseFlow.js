import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CourseDetailModal from './CourseDetailModal';

function CourseFlow({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (courseCode) => {
    setSelectedCourse(courseCode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Course Flow</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.code}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg cursor-pointer"
            onClick={() => handleCourseClick(course.code)}
          >
            <h3 className="text-xl font-semibold mb-2">{course.code}</h3>
            <p className="text-neutral-600 dark:text-neutral-400">{course.name}</p>
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-500">Prerequisites:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {course.prerequisites.map((prereq) => (
                    <span
                      key={prereq}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded text-sm"
                    >
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <CourseDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        courseCode={selectedCourse}
      />
    </div>
  );
}

export default CourseFlow; 