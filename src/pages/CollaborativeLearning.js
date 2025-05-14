import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar/NavBar';
import StudyPartnerFinder from '../components/collaborative/StudyPartnerFinder';
import PeerTutoring from '../components/collaborative/PeerTutoring';
import RealTimeCollaboration from '../components/collaborative/RealTimeCollaboration';

const CollaborativeLearning = () => {
  const [activeTab, setActiveTab] = useState('study-buddy');

  const tabs = [
    { id: 'study-buddy', label: 'Study Buddy Finder' },
    { id: 'peer-tutoring', label: 'Peer Tutoring' },
    { id: 'real-time', label: 'Real-Time Collaboration' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Collaborative Learning Network
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Connect with peers, learn together, and achieve more
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all
                ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-soft">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'study-buddy' && <StudyPartnerFinder />}
            {activeTab === 'peer-tutoring' && <PeerTutoring />}
            {activeTab === 'real-time' && <RealTimeCollaboration />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeLearning; 