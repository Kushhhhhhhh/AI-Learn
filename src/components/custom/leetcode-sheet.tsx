'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BookOpen, Code2, Terminal } from 'lucide-react';
import { ResponseData } from '@/types/leetcode';

interface LeetcodeSheetProps {
  response: ResponseData;
}

export default function LeetcodeSheet({ response }: LeetcodeSheetProps) {
  const renderSolution = () => {
    if (typeof response.solution === 'string') {
      return (
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-green-400 font-mono text-sm">
          <code>{response.solution}</code>
        </pre>
      );
    }

    if (Array.isArray(response.solution)) {
      return response.solution.map((sol, index) => (
        <div key={index} className="mb-6">
          <p className="text-lg font-semibold text-purple-400 mb-2">
            Language: {sol.language}
          </p>
          <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-green-400 font-mono text-sm">
            <code>{sol.code}</code>
          </pre>
        </div>
      ));
    }

    return (
      <div>
        <p className="text-lg font-semibold text-purple-400 mb-2">
          Language: {response.solution.language}
        </p>
        <pre className="bg-gray-900 p-4 rounded-md overflow-auto text-green-400 font-mono text-sm">
          <code>{response.solution.code}</code>
        </pre>
      </div>
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mt-8 space-y-8 p-6 bg-gray-900 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Problem Information */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-700 pb-4">
            <CardTitle className="text-2xl font-bold text-blue-400 flex items-center">
              <BookOpen className="mr-3 text-blue-300" /> Problem Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-lg">
              <span className="text-indigo-300 font-semibold">Number: </span>
              <span className="text-gray-200">{response.problemNumber}</span>
            </p>
            <p className="text-lg mt-2">
              <span className="text-indigo-300 font-semibold">Title: </span>
              <span className="text-gray-200">{response.title}</span>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Problem Statement */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-700 pb-4">
            <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
              <Lightbulb className="mr-3 text-green-300" /> Problem Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-300 leading-relaxed">{response.problemStatement}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Story */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-700 pb-4">
            <CardTitle className="text-2xl font-bold text-purple-400 flex items-center">
              <Code2 className="mr-3 text-purple-300" /> Story
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-300 leading-relaxed">{response.story}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Hints */}
      {response.hints.length > 0 && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="border-b border-gray-700 pb-4">
              <CardTitle className="text-2xl font-bold text-yellow-400 flex items-center">
                <Lightbulb className="mr-3 text-yellow-300" /> Hints
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="list-disc list-inside space-y-2">
                {response.hints.map((hint, index) => (
                  <li key={index} className="text-gray-300">{hint}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Solution */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="border-b border-gray-700 pb-4">
            <CardTitle className="text-2xl font-bold text-pink-400 flex items-center">
              <Terminal className="mr-3 text-pink-300" /> Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {renderSolution()}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}