'use client';

import { motion } from 'framer-motion';

interface NeonTextProps {
  text: string;
}

export default function NeonText({ text }: NeonTextProps) {
  return (
    <motion.span
      className="text-blue-400 relative"
      animate={{ textShadow: ['0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6', '0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6'] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
    >
      {text}
    </motion.span>
  );
}