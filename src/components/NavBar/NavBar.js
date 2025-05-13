import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const currentPath = window.location.pathname;

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-display font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
          CourseMap
        </h1>
        <div className="flex space-x-6">
          <Link
            to="/dashboard"
            className={`${
              currentPath === "/dashboard"
                ? "text-primary font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/flow"
            className={`${
              currentPath === "/flow"
                ? "text-primary font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary"
            }`}
          >
            Course Flow
          </Link>
          <Link
            to="/courses"
            className={`${
              currentPath === "/courses"
                ? "text-primary font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary"
            }`}
          >
            Courses
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
