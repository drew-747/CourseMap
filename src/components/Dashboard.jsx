import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateToCourseFlow = () => {
    navigate('/course-flow');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <nav className="bg-white dark:bg-neutral-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">CourseMap</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300">
                Welcome, {user?.email || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-primary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Course Flow</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Visualize and plan your course prerequisites
                </p>
                <button
                  onClick={navigateToCourseFlow}
                  className="mt-4 btn-primary"
                >
                  View Course Flow
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Progress</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Track your academic progress and remaining requirements
                </p>
                {/* Add progress visualization here */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 