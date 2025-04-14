import React from 'react';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            {/* DCS Logo */}
            <img
              src="/dcs-logo.png"
              alt="DCS Logo"
              className="h-24 w-24 mb-8"
            />

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[#8B0000]">Map Your CS Journey</span>{' '}
              <span className="text-[#006400]">at</span>{' '}
              <span className="text-[#8B0000]">UP Diliman</span>
            </h1>

            <p className="text-lg text-neutral-600 max-w-2xl mb-12">
              An AI-powered course mapping system designed specifically
              for UP Diliman Computer Science students
            </p>

            <button className="bg-[#8B0000] hover:bg-[#6d0000] text-white px-6 py-3 rounded font-medium text-lg">
              Start Planning
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage; 