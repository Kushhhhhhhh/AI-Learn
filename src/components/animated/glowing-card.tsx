'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GlowingCardProps {
  title: string;
  content: string | string[];
  isList?: boolean;
}

export default function GlowingCard({ title, content, isList = false }: GlowingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
          animate={{
            opacity: [0, 0.5, 0],
            left: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-400">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isList ? (
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              {(content as string[]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 whitespace-pre-wrap">{content as string}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}