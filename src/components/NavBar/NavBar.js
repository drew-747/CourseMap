import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

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
            } px-4 py-2 flex items-center`}
          >
            Dashboard
          </Link>
          <Link
            to="/flow"
            className={`${
              currentPath === "/flow"
                ? "text-primary font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary"
            } px-4 py-2 flex items-center`}
          >
            Course Flow
          </Link>
          <Link
            to="/courses"
            className={`${
              currentPath === "/courses"
                ? "text-primary font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary"
            } px-4 py-2 flex items-center`}
          >
            Courses
          </Link>
          <Link
            to="/profile"
            className={`${
              currentPath === "/profile"
                ? "text-primary font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary"
            } px-4 py-2 flex items-center`}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  console.log("User logged out");
                  window.location.href = "/login"; // Redirect to login page after logout
                })
                .catch((error) => {
                  console.error("Error logging out:", error);
                });
            }}
            className="bg-primary text-white font-bold px-4 py-2 rounded hover:bg-primary-light transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
