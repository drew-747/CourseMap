import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Database, Hash, GitGraph, Network } from 'lucide-react';

// Floating animation for icons
export const FloatingIcon = ({ icon: Icon, x, y, delay }) => {
  const randomDuration = 15 + Math.random() * 10;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        scale: [0.7, 1, 0.7],
        x: [x, x + 20, x],
        y: [y, y - 20, y]
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      className="absolute text-primary/20 dark:text-primary/10"
      style={{ left: x, top: y }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

// Binary text animation
export const BinaryText = ({ x, y, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [0.95, 1.05, 0.95]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay
      }}
      className="absolute font-mono text-sm text-primary/20 dark:text-primary/10"
      style={{ left: x, top: y }}
    >
      01
    </motion.div>
  );
};

// Matrix-like falling characters
export const MatrixRain = ({ x }) => {
  const characters = "10";
  const length = 8;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: [0, 0.2, 0],
        y: ["0vh", "100vh"]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        delay: Math.random() * 5
      }}
      className="absolute font-mono text-xs text-primary/10 dark:text-primary/20 whitespace-pre leading-none"
      style={{ left: x }}
    >
      {Array.from({ length }).map(() => characters[Math.floor(Math.random() * characters.length)]).join('\n')}
    </motion.div>
  );
};

// Grid pattern animation
export const AnimatedGrid = () => {
  return (
    <motion.div
      className="absolute inset-0 opacity-[0.015]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.015 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
  );
};

// Background animations container
export const BackgroundAnimations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatedGrid />
      
      {/* Floating icons */}
      <FloatingIcon icon={Code} x="10%" y="20%" delay={0} />
      <FloatingIcon icon={Terminal} x="85%" y="15%" delay={1} />
      <FloatingIcon icon={Database} x="75%" y="60%" delay={2} />
      <FloatingIcon icon={Hash} x="15%" y="70%" delay={3} />
      <FloatingIcon icon={GitGraph} x="90%" y="40%" delay={4} />
      <FloatingIcon icon={Network} x="5%" y="40%" delay={5} />
      
      {/* Binary texts */}
      <BinaryText x="20%" y="30%" delay={0} />
      <BinaryText x="70%" y="25%" delay={2} />
      <BinaryText x="40%" y="75%" delay={4} />
      <BinaryText x="80%" y="70%" delay={6} />
      
      {/* Matrix rain effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <MatrixRain key={i} x={`${i * 10}%`} />
      ))}
    </div>
  );
}; 