import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, MessageSquare, Code, Terminal } from 'lucide-react';

const PeerTutoring = () => {
  const [tutoringSessions, setTutoringSessions] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Mock data for demonstration
  const mockSessions = [
    {
      id: 1,
      tutor: {
        name: 'Alex Chen',
        yearLevel: '4th Year',
        specialization: 'Web Development',
        rating: 4.8,
        reviews: 12,
        expertise: ['JavaScript', 'React', 'Node.js'],
      },
      subject: 'Web Development',
      topics: ['React Hooks', 'State Management', 'API Integration'],
      schedule: 'Weekdays, 6-8 PM',
      price: 'Free',
      format: 'Online',
      availability: '3 slots left',
    },
    {
      id: 2,
      tutor: {
        name: 'Sarah Park',
        yearLevel: '3rd Year',
        specialization: 'Data Structures',
        rating: 4.9,
        reviews: 8,
        expertise: ['Algorithms', 'Data Structures', 'Python'],
      },
      subject: 'Data Structures & Algorithms',
      topics: ['Binary Trees', 'Graph Algorithms', 'Dynamic Programming'],
      schedule: 'Weekends, 2-4 PM',
      price: 'Free',
      format: 'Online',
      availability: '2 slots left',
    },
  ];

  useEffect(() => {
    // TODO: Implement actual API call to fetch tutoring sessions
    setTutoringSessions(mockSessions);
  }, []);

  const SessionCard = ({ session }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft mb-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {session.tutor.name}
            </h3>
            <span className="flex items-center text-sm text-yellow-600">
              <Star className="w-4 h-4 mr-1" />
              {session.tutor.rating}
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              ({session.tutor.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center mt-2 space-x-4">
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <BookOpen className="w-4 h-4 mr-1" />
              {session.tutor.yearLevel}
            </span>
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Code className="w-4 h-4 mr-1" />
              {session.tutor.specialization}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-primary">
            {session.price}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            per session
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Expertise
        </h4>
        <div className="flex flex-wrap gap-2">
          {session.tutor.expertise.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Topics Covered
        </h4>
        <div className="flex flex-wrap gap-2">
          {session.topics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4 mr-1" />
            {session.schedule}
          </span>
          <span className="text-sm text-green-600 dark:text-green-400">
            {session.availability}
          </span>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Book Session
          </button>
        </div>
      </div>
    </motion.div>
  );

  const CreateSessionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
          Offer Tutoring
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Subject
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <option>Web Development</option>
              <option>Data Structures & Algorithms</option>
              <option>Database Systems</option>
              <option>Machine Learning</option>
              <option>Mobile Development</option>
              <option>Cybersecurity</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Topics
            </label>
            <input
              type="text"
              placeholder="Enter topics separated by commas"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Schedule
            </label>
            <input
              type="text"
              placeholder="e.g., Weekdays, 6-8 PM"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Create Session
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Peer Tutoring
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Offer Tutoring
        </button>
      </div>

      {/* Available Sessions */}
      <div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Available Tutoring Sessions
        </h3>
        {tutoringSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {isCreating && <CreateSessionModal />}
    </div>
  );
};

export default PeerTutoring; 