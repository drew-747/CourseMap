import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function NavBar() {
  const currentPath = window.location.pathname;

  const navLinks = [
    { to: "/flow", label: "Course Flow" },
    { to: "/courses", label: "Courses" },
    { to: "/gwa", label: "GWA Calculator" },
    { to: "/collaborative", label: "CS Network" },
    { to: "/forum", label: "Forum" },
    { to: "/profile", label: "Profile" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-white/90 dark:bg-neutral-900/90 shadow-md px-8 py-3 sticky top-0 z-50 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-display font-bold bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent tracking-tight select-none">
          CourseMap
        </Link>
        <div className="flex items-center space-x-2 md:space-x-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-colors px-4 py-2 rounded-lg font-medium text-base hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary ${
                currentPath === to
                  ? "text-primary font-bold bg-primary/10 dark:bg-primary/20"
                  : "text-neutral-700 dark:text-neutral-300"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  window.location.href = "/login";
                })
                .catch((error) => {
                  console.error("Error logging out:", error);
                });
            }}
            className="ml-4 px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow hover:from-secondary hover:to-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
