import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar/NavBar';
import { courseData } from '../data/courseData';
import CourseDetailModal from '../components/CourseDetailModal';

const bestPractices = {
  'CS 11': [
    {
      author: 'Senior Student',
      tip: 'Practice coding every week. Focus on understanding logic, not just syntax.'
    },
    {
      author: 'Prof. Dela Cruz',
      tip: 'Read the official Python docs and try to build small projects.'
    }
  ],
  'CS 12': [
    {
      author: 'Senior Student',
      tip: 'Master OOP concepts early. Use Java documentation and online tutorials.'
    }
  ],
  // ... add more for other courses ...
};

const resources = {
  'CS 11': [
    { label: 'Python Official Docs', url: 'https://docs.python.org/3/' },
    { label: 'W3Schools Python', url: 'https://www.w3schools.com/python/' }
  ],
  'CS 12': [
    { label: 'Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/' },
    { label: 'OOP Concepts', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' }
  ],
  // ... add more for other courses ...
};

function Courses() {
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredCourses = Object.entries(courseData).filter(([code, data]) => {
    const q = search.toLowerCase();
    return (
      code.toLowerCase().includes(q) ||
      (data.name && data.name.toLowerCase().includes(q))
    );
  });

  const showResult = search.trim() && filteredCourses.length === 1;
  const courseToShow = showResult ? filteredCourses[0][0] : null;

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-8 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent"
          >
            Course Information
          </motion.h1>
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              placeholder="Search by course code or name (e.g. CS 11, Data Structures)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow"
            />
          </div>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <button
                className="p-6 rounded-xl bg-white/80 dark:bg-neutral-800/80 shadow-lg cursor-pointer transition-all duration-300 w-full text-left"
                onClick={() => { setSelectedCourse(courseToShow); setModalOpen(true); }}
              >
                <div className="font-bold text-lg mb-2 text-primary">{filteredCourses[0][0]}</div>
                <div className="font-semibold text-xl mb-1">{filteredCourses[0][1].name}</div>
                <div className="text-neutral-600 dark:text-neutral-300 mb-2 text-sm line-clamp-2">{filteredCourses[0][1].description}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">Units: {filteredCourses[0][1].units}</div>
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <CourseDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        courseCode={selectedCourse}
        bestPractices={bestPractices[selectedCourse] || []}
        resources={resources[selectedCourse] || []}
      />
    </div>
  );
}

export default Courses; 