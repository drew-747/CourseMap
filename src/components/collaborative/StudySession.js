import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Video, Mic, Share, MessageSquare, FileText } from 'lucide-react';

const StudySession = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Mock data for demonstration
  const mockSessions = [
    {
      id: 1,
      title: 'CS 101 Study Group',
      participants: 4,
      duration: '2 hours',
      topic: 'Data Structures',
      status: 'active',
    },
    {
      id: 2,
      title: 'MATH 101 Review',
      participants: 3,
      duration: '1.5 hours',
      topic: 'Calculus',
      status: 'scheduled',
    },
  ];

  useEffect(() => {
    // TODO: Implement actual API call to fetch study sessions
    setSessions(mockSessions);
  }, []);

  const SessionCard = ({ session }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft mb-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {session.title}
          </h3>
          <div className="flex items-center mt-2 space-x-4">
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Users className="w-4 h-4 mr-1" />
              {session.participants} participants
            </span>
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="w-4 h-4 mr-1" />
              {session.duration}
            </span>
          </div>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Topic: {session.topic}
          </p>
        </div>
        <div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              session.status === 'active'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
            }`}
          >
            {session.status}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
          View Details
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Join Session
        </button>
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
          Create Study Session
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Session Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Topic
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Duration
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <option>1 hour</option>
              <option>1.5 hours</option>
              <option>2 hours</option>
              <option>2.5 hours</option>
              <option>3 hours</option>
            </select>
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
          Study Sessions
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Create Session
        </button>
      </div>

      {/* Active Session */}
      {activeSession && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
            Active Session
          </h3>
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
            <div className="flex items-center space-x-4 mb-4">
              <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
                <Video className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
                <Mic className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
                <Share className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
                <MessageSquare className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
                <FileText className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            {/* TODO: Implement collaborative features */}
          </div>
        </div>
      )}

      {/* Available Sessions */}
      <div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Available Sessions
        </h3>
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

      {isCreating && <CreateSessionModal />}
    </div>
  );
};

export default StudySession; 