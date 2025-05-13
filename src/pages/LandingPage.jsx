import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain,
  GitGraph,
  Route,
  Sun,
  Moon,
  ChevronRight,
  GraduationCap,
  Code2,
  Network,
  Menu,
  X
} from 'lucide-react';
import { CONTENT } from '../constants/branding';
import CodeAnimations from '../components/CodeAnimations';
import ChatBot from '../components/ChatBot';
import { courseData } from '../data/courseData';

const bestPractices = {
  'CS 11': [
    {
      author: 'Senior Student',
      tip: 'Practice coding every week. Focus on understanding logic, not just syntax.'
    },
    {
      author: 'Prof. Dela Cruz',
      tip: 'Read the official Python docs and try to build small projects.'
    }
  ],
  'CS 12': [
    {
      author: 'Senior Student',
      tip: 'Master OOP concepts early. Use Java documentation and online tutorials.'
    }
  ],
  // ... add more for other courses ...
};

const resources = {
  'CS 11': [
    { label: 'Python Official Docs', url: 'https://docs.python.org/3/' },
    { label: 'W3Schools Python', url: 'https://www.w3schools.com/python/' }
  ],
  'CS 12': [
    { label: 'Java Tutorials', url: 'https://docs.oracle.com/javase/tutorial/' },
    { label: 'OOP Concepts', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' }
  ],
  // ... add more for other courses ...
};

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const filteredCourses = Object.entries(courseData).filter(([code, data]) => {
    const q = search.toLowerCase();
    return (
      code.toLowerCase().includes(q) ||
      (data.name && data.name.toLowerCase().includes(q)) ||
      (data.description && data.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative min-h-screen">
      <CodeAnimations />
      <ChatBot />
      
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="font-display font-bold">UP Diliman CS</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-white/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-white relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 relative"
              >
                <div className="w-40 h-40 mx-auto relative bg-white dark:bg-neutral-800 rounded-full p-2 shadow-2xl">
                  <img 
                    src="/dcs_logo.png" 
                    alt="UP Department of Computer Science Logo" 
                    className="w-full h-full object-contain"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-transparent rounded-full"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent"
              >
                {CONTENT.hero.title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto"
              >
                {CONTENT.hero.subtitle}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary-light text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                {CONTENT.hero.cta} <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-neutral-50/50 dark:bg-neutral-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CONTENT.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-4xl md:text-5xl font-display font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-neutral-600 dark:text-neutral-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
            >
              Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CONTENT.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="p-6 rounded-xl bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4"
                  >
                    {feature.icon === 'Brain' && <Brain className="w-6 h-6 text-primary" />}
                    {feature.icon === 'GitGraph' && <GitGraph className="w-6 h-6 text-primary" />}
                    {feature.icon === 'Route' && <Route className="w-6 h-6 text-primary" />}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="font-display font-bold">UP Diliman CS</span>
              </div>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://dcs.upd.edu.ph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                >
                  <Code2 size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
                >
                  <Network size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage; 