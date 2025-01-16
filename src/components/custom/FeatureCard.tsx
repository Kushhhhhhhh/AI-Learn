import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-px"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 rounded-lg bg-gray-900 p-8 transition-colors duration-300 group-hover:bg-gray-800">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 transition-all duration-300 group-hover:bg-gray-600">
          <Icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-full bg-white blur-md opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-gray-400 text-center transition-colors duration-300 group-hover:text-gray-300">{description}</p>
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-700 to-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
    </motion.div>
  );
};