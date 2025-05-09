import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GitBranch, GitMerge, Book, ChevronRight, Import } from "lucide-react";
import NavBar from "../components/NavBar/NavBar";
// Animated card component
const FeatureCard = ({ icon: Icon, title, description, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white dark:bg-neutral-800 rounded-2xl p-6 cursor-pointer
      shadow-soft hover:shadow-soft-lg transition-all duration-300
      border border-neutral-200 dark:border-neutral-700"
  >
    <div className="flex items-start space-x-4">
      <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {description}
        </p>
        <div className="flex items-center text-primary font-medium">
          <span>Learn more</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  </motion.div>
);

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="text-4xl md:text-5xl font-display font-bold mb-4 
            bg-gradient-to-r from-primary via-primary-light to-secondary 
            bg-clip-text text-transparent"
            >
              Welcome to CourseMap
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Your personalized guide through the UP Computer Science
              curriculum. Track your progress and plan your academic journey
              with ease.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={GitBranch}
              title="Course Flow"
              description="View the interactive flowchart of your curriculum and track your progress through an intuitive visual interface."
              onClick={() => navigate("/flow")}
              delay={0.1}
            />
            <FeatureCard
              icon={GitMerge}
              title="Prerequisites"
              description="Understand course dependencies and plan your semesters effectively with our smart prerequisite tracking."
              onClick={() => navigate("/prerequisites")}
              delay={0.2}
            />
            <FeatureCard
              icon={Book}
              title="Course Information"
              description="Access detailed information about each course, including prerequisites and advice from seniors."
              onClick={() => navigate("/courses")}
              delay={0.3}
            />
          </div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-white dark:bg-neutral-800 rounded-2xl p-8
            shadow-soft border border-neutral-200 dark:border-neutral-700"
          >
            <h2 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-white">
              Your Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Units Completed", value: "89/144" },
                { label: "Major Courses", value: "12/18" },
                { label: "GE Courses", value: "27/45" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-700/50"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
