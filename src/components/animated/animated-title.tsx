import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  children: React.ReactNode;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ children }) => {
  return (
    <motion.h2 
      className="text-5xl font-extrabold tracking-tight sm:text-6xl text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
};