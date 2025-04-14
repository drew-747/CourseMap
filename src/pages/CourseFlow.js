import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import Navbar from '../components/Navbar';

const CourseCard = ({ code, completed, units, onToggle }) => {
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
        <div>
          <span className="font-medium">{code}</span>
          <span className="ml-2 text-sm text-neutral-500">({units} units)</span>
        </div>
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
  // Initial course states with unit counts based on the curriculum
  const [courses, setCourses] = useState({
    'CS 11': { completed: true, units: 3 },
    'CS 12': { completed: true, units: 3 },
    'CS 30': { completed: true, units: 3 },
    'CS 31': { completed: false, units: 3 },
    'CS 20': { completed: false, units: 3 },
    'CS 21': { completed: false, units: 4 },
    'CS 32': { completed: false, units: 4 },
    'CS 33': { completed: false, units: 3 },
    'CS 140': { completed: false, units: 3 },
    'CS 145': { completed: false, units: 4 },
    'CS 150': { completed: false, units: 3 },
    'CS 153': { completed: false, units: 3 },
    'CS 133': { completed: false, units: 3 },
    'CS 155': { completed: false, units: 3 },
    'CS 194': { completed: false, units: 3 },
    'CS 132': { completed: false, units: 3 },
    'CS 136': { completed: false, units: 3 },
    'CS 196': { completed: false, units: 1 },
    'CS 198': { completed: false, units: 3 },
    'CS 199/200': { completed: false, units: 3 },
    'CS 195': { completed: false, units: 3 },
  });

  const toggleCourse = (code) => {
    setCourses(prev => ({
      ...prev,
      [code]: {
        ...prev[code],
        completed: !prev[code].completed
      }
    }));
  };

  // Calculate total units and completed units
  const totalUnits = 144; // Total units required for graduation
  const completedUnits = Object.values(courses).reduce((sum, course) => 
    sum + (course.completed ? course.units : 0), 0);
  const totalMajorUnits = Object.values(courses).reduce((sum, course) => sum + course.units, 0);
  const completedMajorCourses = Object.values(courses).filter(course => course.completed).length;
  const totalMajorCourses = Object.keys(courses).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft"
          >
            <h3 className="text-lg font-semibold mb-2">Total Progress</h3>
            <div className="text-3xl font-bold text-[#8B0000]">
              {completedUnits}/144
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Units Completed
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft"
          >
            <h3 className="text-lg font-semibold mb-2">Major Subjects</h3>
            <div className="text-3xl font-bold text-[#8B0000]">
              {completedMajorCourses}/{totalMajorCourses}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Major Courses
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft"
          >
            <h3 className="text-lg font-semibold mb-2">GE Requirements</h3>
            <div className="text-3xl font-bold text-[#8B0000]">
              27/45
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              GE Units
            </div>
          </motion.div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Course Flow
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your academic progress through an interactive flowchart
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* First Column */}
          <div className="space-y-4">
            {Object.entries(courses)
              .slice(0, Math.ceil(Object.keys(courses).length / 2))
              .map(([code, data]) => (
                <CourseCard 
                  key={code}
                  code={code}
                  completed={data.completed}
                  units={data.units}
                  onToggle={() => toggleCourse(code)}
                />
              ))}
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            {Object.entries(courses)
              .slice(Math.ceil(Object.keys(courses).length / 2), -1)
              .map(([code, data]) => (
                <CourseCard 
                  key={code}
                  code={code}
                  completed={data.completed}
                  units={data.units}
                  onToggle={() => toggleCourse(code)}
                />
              ))}
          </div>
        </div>

        {/* Special Case */}
        <div className="mt-8">
          <CourseCard 
            code="CS 195" 
            completed={courses['CS 195'].completed}
            units={courses['CS 195'].units}
            onToggle={() => toggleCourse('CS 195')}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseFlow; 