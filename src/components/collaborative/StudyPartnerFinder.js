import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Clock, BookOpen, Brain, Code, Terminal, Database, Network } from 'lucide-react';
import RealTimeCollaboration from './RealTimeCollaboration';

const StudyPartnerFinder = () => {
  const [filters, setFilters] = useState({
    courses: [],
    programmingLanguages: [],
    learningStyle: '',
    schedule: '',
    skillLevel: '',
    specialization: '',
    yearLevel: '',
  });

  const [potentialPartners, setPotentialPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [collabPartner, setCollabPartner] = useState(null);

  // Mock data for demonstration
  const mockPartners = [
    {
      id: 1,
      name: 'John Doe',
      courses: ['CS 101', 'CS 102', 'MATH 101'],
      programmingLanguages: ['Python', 'Java', 'JavaScript'],
      learningStyle: 'Visual',
      schedule: 'Morning',
      skillLevel: 'Intermediate',
      specialization: 'Web Development',
      yearLevel: '2nd Year',
      compatibility: 85,
      strengths: ['Problem Solving', 'Data Structures', 'Web Development'],
      weaknesses: ['Machine Learning', 'System Design'],
      preferredStudyTopics: ['Algorithms', 'Database Systems', 'Web Development'],
      githubProfile: 'github.com/johndoe',
      projects: ['Personal Portfolio', 'E-commerce Website'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      courses: ['CS 101', 'CS 103', 'MATH 102'],
      programmingLanguages: ['Python', 'C++', 'SQL'],
      learningStyle: 'Practical',
      schedule: 'Evening',
      skillLevel: 'Advanced',
      specialization: 'Data Science',
      yearLevel: '3rd Year',
      compatibility: 92,
      strengths: ['Machine Learning', 'Data Analysis', 'Python'],
      weaknesses: ['Web Development', 'Mobile Development'],
      preferredStudyTopics: ['Machine Learning', 'Data Structures', 'Database Systems'],
      githubProfile: 'github.com/janesmith',
      projects: ['ML Project', 'Data Analysis Tool'],
    },
  ];

  useEffect(() => {
    // TODO: Implement actual API call to fetch potential partners
    setPotentialPartners(mockPartners);
  }, [filters]);

  const PartnerCard = ({ partner }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft mb-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {partner.name}
          </h3>
          <div className="flex items-center mt-2 space-x-4">
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <BookOpen className="w-4 h-4 mr-1" />
              {partner.yearLevel}
            </span>
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Code className="w-4 h-4 mr-1" />
              {partner.specialization}
            </span>
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="w-4 h-4 mr-1" />
              {partner.schedule}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {partner.compatibility}%
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Match Score
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Programming Languages
        </h4>
        <div className="flex flex-wrap gap-2">
          {partner.programmingLanguages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Technical Strengths
        </h4>
        <div className="flex flex-wrap gap-2">
          {partner.strengths.map((strength) => (
            <span
              key={strength}
              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
            >
              {strength}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Looking to Learn
        </h4>
        <div className="flex flex-wrap gap-2">
          {partner.weaknesses.map((weakness) => (
            <span
              key={weakness}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
            >
              {weakness}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Study Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {partner.preferredStudyTopics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <a
          href={partner.githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
        >
          View GitHub
        </a>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          onClick={() => setCollabPartner(partner)}
        >
          Connect
        </button>
      </div>
    </motion.div>
  );

  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
          Filter Study Partners
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Year Level
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
            >
              <option value="">Any Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Specialization
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
            >
              <option value="">Any Specialization</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Game Development">Game Development</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Programming Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Java', 'JavaScript', 'C++', 'C#', 'Ruby', 'Go'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    const langs = filters.programmingLanguages.includes(lang)
                      ? filters.programmingLanguages.filter((l) => l !== lang)
                      : [...filters.programmingLanguages, lang];
                    setFilters({ ...filters, programmingLanguages: langs });
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.programmingLanguages.includes(lang)
                      ? 'bg-primary text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for CS study partners..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="px-4 py-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
          >
            <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) =>
            value && value.length > 0 ? (
              <span
                key={key}
                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm text-neutral-600 dark:text-neutral-400"
              >
                {key}: {Array.isArray(value) ? value.join(', ') : value}
              </span>
            ) : null
          )}
        </div>
      </div>

      {/* Results */}
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
          Potential Study Partners
        </h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div>
            {potentialPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )}
      </div>

      {showFilters && <FilterModal />}
      {collabPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-4 w-full max-w-4xl relative">
            <button
              className="absolute top-4 right-4 text-neutral-600 dark:text-neutral-400 hover:text-primary"
              onClick={() => setCollabPartner(null)}
            >
              Close
            </button>
            <RealTimeCollaboration studyBuddy={collabPartner} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPartnerFinder; 