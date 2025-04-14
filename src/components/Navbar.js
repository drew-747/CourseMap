import React from 'react';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src="/dcs-logo.png"
              alt="DCS Logo"
              className="h-8 w-8"
            />
            <span className="ml-3 text-lg font-medium text-neutral-900">
              CourseMap
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#courses">Courses</NavLink>
            <NavLink href="#prerequisites">Prerequisites</NavLink>
            <NavLink href="#faqs">FAQs</NavLink>
            <button className="text-neutral-700 hover:text-neutral-900 font-medium">
              Sign in
            </button>
            <button className="bg-[#8B0000] hover:bg-[#6d0000] text-white px-4 py-2 rounded font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// NavLink component for consistent styling
function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-neutral-600 hover:text-neutral-900 font-medium"
    >
      {children}
    </a>
  );
}

export default Navbar; 