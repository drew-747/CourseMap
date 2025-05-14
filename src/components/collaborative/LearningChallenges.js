import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock, Code, Target, Award } from 'lucide-react';

const LearningChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Mock data for demonstration
  const mockChallenges = [
    {
      id: 1,
      title: 'Algorithm Mastery Challenge',
      description: 'Solve 50 algorithm problems in 30 days',
      type: 'Individual',
      difficulty: 'Intermediate',
      participants: 45,
      startDate: '2024-03-01',
      endDate: '2024-03-30',
      rewards: ['Certificate', 'GitHub Badge', 'Interview Prep'],
      topics: ['Data Structures', 'Algorithms', 'Problem Solving'],
      progress: {
        current: 15,
        total: 50,
      },
    },
    {
      id: 2,
      title: 'Web Development Sprint',
      description: 'Build a full-stack application in 2 weeks',
      type: 'Team',
      difficulty: 'Advanced',
      participants: 28,
      startDate: '2024-03-15',
      endDate: '2024-03-29',
      rewards: ['Project Showcase', 'Team Trophy', 'Mentorship'],
      topics: ['React', 'Node.js', 'Database Design'],
      progress: {
        current: 3,
        total: 14,
      },
    },
  ];

  useEffect(() => {
    setChallenges(mockChallenges);
  }, []);

  const ChallengeCard = ({ challenge }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft mb-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            {challenge.title}
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {challenge.description}
          </p>
          <div className="flex items-center mt-4 space-x-4">
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Users className="w-4 h-4 mr-1" />
              {challenge.participants} participants
            </span>
            <span className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="w-4 h-4 mr-1" />
              {challenge.type}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                challenge.difficulty === 'Advanced'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
              }`}
            >
              {challenge.difficulty}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-primary">
            {challenge.progress.current}/{challenge.progress.total}
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Days Completed
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {challenge.topics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
          Rewards
        </h4>
        <div className="flex flex-wrap gap-2">
          {challenge.rewards.map((reward) => (
            <span
              key={reward}
              className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
            >
              {reward}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
          View Details
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Join Challenge
        </button>
      </div>
    </motion.div>
  );

  const CreateChallengeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
          Create Challenge
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Challenge Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Type
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <option>Individual</option>
              <option>Team</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Difficulty
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
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
              Create Challenge
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
          Learning Challenges
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Create Challenge
        </button>
      </div>

      {/* Active Challenges */}
      <div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
          Active Challenges
        </h3>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {isCreating && <CreateChallengeModal />}
    </div>
  );
};

export default LearningChallenges; 