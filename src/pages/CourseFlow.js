import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

const CourseCard = ({ code, completed, onToggle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-4 rounded-lg cursor-pointer border-2
        ${completed ? 
          'bg-green-50 border-green-500 dark:bg-green-900/20' : 
          'bg-white border-gray-200 dark:bg-neutral-800 dark:border-neutral-700'
        }
      `}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{code}</span>
        <div className={`
          w-5 h-5 rounded-full flex items-center justify-center
          ${completed ? 'bg-green-500' : 'border-2 border-gray-300 dark:border-neutral-600'}
        `}>
          {completed ? (
            <Check className="w-3 h-3 text-white" />
          ) : (
            <Circle className="w-3 h-3 text-gray-300 dark:text-neutral-600" />
          )}
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
        {completed ? 'COMPLETED' : 'NOT TAKEN'}
      </div>
    </motion.div>
  );
};

function CourseFlow() {
  // Initial course states based on the curriculum
  const [courses, setCourses] = useState({
    'CS 11': true,
    'CS 12': true,
    'CS 30': true,
    'CS 31': false,
    'CS 20': false,
    'CS 21': false,
    'CS 32': false,
    'CS 33': false,
    'CS 140': false,
    'CS 145': false,
    'CS 150': false,
    'CS 153': false,
    'CS 133': false,
    'CS 155': false,
    'CS 194': false,
    'CS 132': false,
    'CS 136': false,
    'CS 196': false,
    'CS 198': false,
    'CS 199/200': false,
    'CS 195': false,
  });

  const toggleCourse = (code) => {
    setCourses(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            UP Computer Science Curriculum
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your academic progress through an interactive flowchart
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* First Column */}
          <div className="space-y-4">
            <CourseCard code="CS 11" completed={courses['CS 11']} onToggle={() => toggleCourse('CS 11')} />
            <CourseCard code="CS 30" completed={courses['CS 30']} onToggle={() => toggleCourse('CS 30')} />
            <CourseCard code="CS 20" completed={courses['CS 20']} onToggle={() => toggleCourse('CS 20')} />
            <CourseCard code="CS 32" completed={courses['CS 32']} onToggle={() => toggleCourse('CS 32')} />
            <CourseCard code="CS 140" completed={courses['CS 140']} onToggle={() => toggleCourse('CS 140')} />
            <CourseCard code="CS 150" completed={courses['CS 150']} onToggle={() => toggleCourse('CS 150')} />
            <CourseCard code="CS 133" completed={courses['CS 133']} onToggle={() => toggleCourse('CS 133')} />
            <CourseCard code="CS 194" completed={courses['CS 194']} onToggle={() => toggleCourse('CS 194')} />
            <CourseCard code="CS 136" completed={courses['CS 136']} onToggle={() => toggleCourse('CS 136')} />
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            <CourseCard code="CS 12" completed={courses['CS 12']} onToggle={() => toggleCourse('CS 12')} />
            <CourseCard code="CS 31" completed={courses['CS 31']} onToggle={() => toggleCourse('CS 31')} />
            <CourseCard code="CS 21" completed={courses['CS 21']} onToggle={() => toggleCourse('CS 21')} />
            <CourseCard code="CS 33" completed={courses['CS 33']} onToggle={() => toggleCourse('CS 33')} />
            <CourseCard code="CS 145" completed={courses['CS 145']} onToggle={() => toggleCourse('CS 145')} />
            <CourseCard code="CS 153" completed={courses['CS 153']} onToggle={() => toggleCourse('CS 153')} />
            <CourseCard code="CS 155" completed={courses['CS 155']} onToggle={() => toggleCourse('CS 155')} />
            <CourseCard code="CS 132" completed={courses['CS 132']} onToggle={() => toggleCourse('CS 132')} />
            <CourseCard code="CS 196" completed={courses['CS 196']} onToggle={() => toggleCourse('CS 196')} />
            <CourseCard code="CS 198" completed={courses['CS 198']} onToggle={() => toggleCourse('CS 198')} />
            <CourseCard code="CS 199/200" completed={courses['CS 199/200']} onToggle={() => toggleCourse('CS 199/200')} />
          </div>
        </div>

        {/* Special Case */}
        <div className="mt-8">
          <CourseCard code="CS 195" completed={courses['CS 195']} onToggle={() => toggleCourse('CS 195')} />
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-soft"
        >
          <h2 className="text-2xl font-semibold mb-6">Course Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-neutral-50 dark:bg-neutral-700/50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-[#8B0000]">
                {Object.values(courses).filter(Boolean).length}/{Object.keys(courses).length}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Major Courses Completed
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CourseFlow; 