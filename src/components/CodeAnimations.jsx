import React from 'react';
import { motion } from 'framer-motion';
import { Code, Binary, Cloud, Rocket, Sparkles } from 'lucide-react';

// Sticker effect component
const Sticker = ({ children, x, y, rotate = 0, scale = 1, delay = 0 }) => (
  <motion.div
    className="absolute"
    style={{ 
      left: x, 
      top: y,
      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
      transformOrigin: 'center',
    }}
    animate={{
      y: [y, y - 12, y],
      rotate: [rotate - 5, rotate + 5, rotate - 5],
      scale: [scale, scale * 1.1, scale],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  >
    {children}
  </motion.div>
);

// Fun card component
const FunCard = ({ children, x, y, color, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-2xl p-4 ${color} border-2 border-white/20`}
    style={{ 
      left: x, 
      top: y,
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transform: 'rotate(-2deg)',
    }}
    animate={{
      y: [y, y - 15, y],
      rotate: [-4, 0, -4],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
    whileHover={{ scale: 1.1 }}
  >
    {children}
  </motion.div>
);

// Emoji-style icon
const EmojiIcon = ({ icon: Icon, x, y, color, delay = 0, rotate = 0 }) => (
  <Sticker x={x} y={y} delay={delay} rotate={rotate}>
    <div className={`p-4 rounded-full ${color} shadow-lg`}
         style={{
           background: 'white',
           border: '2px solid rgba(0,0,0,0.1)',
         }}>
      <Icon size={24} className="text-current" strokeWidth={2} />
    </div>
  </Sticker>
);

const CodeAnimations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Fun cards */}
      <FunCard x="5%" y="15%" color="bg-[#FFE8F0]" delay={0.2}>
        <div className="text-[#FF4D8D] font-mono text-sm font-bold">
          {"// coding is fun! 🚀"}
        </div>
      </FunCard>

      <FunCard x="75%" y="70%" color="bg-[#E8F4FF]" delay={0.8}>
        <div className="text-[#4D9FFF] font-mono text-sm font-bold">
          {"build(); ✨"}
        </div>
      </FunCard>

      {/* Emoji-style icons */}
      <EmojiIcon 
        icon={Rocket} 
        x="80%" 
        y="20%" 
        delay={0.3}
        rotate={-15}
        color="text-[#FF4D8D]"
      />
      <EmojiIcon 
        icon={Code} 
        x="15%" 
        y="65%" 
        delay={0.6}
        color="text-[#4D9FFF]"
      />
      <EmojiIcon 
        icon={Sparkles} 
        x="85%" 
        y="45%" 
        delay={0.9}
        rotate={15}
        color="text-[#47CF73]"
      />

      {/* Decorative elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 40 + 20 + 'px',
            height: Math.random() * 40 + 20 + 'px',
            background: [
              '#FFE8F0',
              '#E8F4FF',
              '#E8FFE8',
              '#FFE8FF',
              '#FFF9E8'
            ][i],
            left: `${15 + i * 20}%`,
            top: `${Math.random() * 60 + 20}%`,
            opacity: 0.6,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};

export default CodeAnimations; 