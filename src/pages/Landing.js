import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Award, Users, ArrowRight } from 'lucide-react';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF8F8] dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        <div className="flex justify-center mb-8">
          <img 
            src="/dcs-logo.png" 
            alt="Department of Computer Science Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-[#8B0000]">Map Your CS Journey</span>{' '}
            <span className="text-[#006400]">at</span>{' '}
            <span className="text-[#8B0000]">UP Diliman</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
            An AI-powered course mapping system designed specifically
            for UP Diliman Computer Science students
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-[#8B0000] hover:bg-[#6B0000] text-white font-semibold px-8 py-3 rounded-lg
              transition-all duration-300 flex items-center justify-center mx-auto space-x-2"
          >
            <span>Start Planning</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, value: '1000+', label: 'Students Guided' },
            { icon: Award, value: '98%', label: 'Graduation Rate' },
            { icon: Rocket, value: '85%', label: 'On-time Completion' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#8B0000]" />
                <div className="text-3xl font-bold text-[#8B0000] mb-2">{stat.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Juan Dela Cruz',
                achievement: 'Graduated with Latin Honors',
                story: 'CourseMap helped me optimize my course load each semester, allowing me to maintain academic excellence.',
                year: '2023'
              },
              {
                name: 'Maria Santos',
                achievement: 'Finished in 4 years',
                story: 'The prerequisite tracking feature made it easy to plan my courses efficiently and graduate on time.',
                year: '2023'
              },
              {
                name: 'Carlo Garcia',
                achievement: 'Dean\'s Lister',
                story: 'The course information and senior advice helped me make informed decisions about my academic path.',
                year: '2022'
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft"
              >
                <div className="mb-4">
                  <div className="text-lg font-semibold text-[#8B0000]">{story.name}</div>
                  <div className="text-sm text-neutral-500">Class of {story.year}</div>
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {story.story}
                </div>
                <div className="text-sm font-medium text-[#006400]">
                  {story.achievement}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join our community</h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            Connect with fellow CS students and get guidance from seniors
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#006400] hover:bg-[#004400] text-white font-semibold px-8 py-3 rounded-lg
              transition-all duration-300"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing; 