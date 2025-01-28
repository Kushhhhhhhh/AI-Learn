'use client';

import { motion } from 'framer-motion';
import { Question } from '@/types/question';
import { Button } from "@/components/ui/button"

interface QuestionSheetProps {
  questions: Question[];
  selectedAnswers: { [key: number]: string };
  handleOptionClick: (questionIndex: number, selectedOption: string) => void;
}

export default function QuestionSheet({ questions, selectedAnswers, handleOptionClick }: QuestionSheetProps) {
  const sheetVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={sheetVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.5 }}
      className=" rounded-lg shadow-xl overflow-hidden"
    >
      <div className="p-6 space-y-8">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            index={index}
            selectedAnswer={selectedAnswers[index]}
            handleOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface QuestionItemProps {
  question: Question;
  index: number;
  selectedAnswer?: string;
  handleOptionClick: (questionIndex: number, selectedOption: string) => void;
}

function QuestionItem({ question, index, selectedAnswer, handleOptionClick }: QuestionItemProps) {
  const getButtonStyle = (selectedOption: string, correctAnswer: string) => {
    if (selectedAnswer) {
      if (selectedOption === correctAnswer) {
        return 'bg-green-500 hover:bg-green-600';
      } else if (selectedOption === selectedAnswer) {
        return 'bg-red-500 hover:bg-red-600';
      }
    }
    return 'bg-gray-700 hover:bg-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-t border-gray-700 pt-6 first:border-t-0 first:pt-0"
    >
      <h3 className="text-xl font-semibold text-gray-300 mb-3">Question {index + 1}:</h3>
      <p className="text-gray-400 whitespace-pre-wrap mb-4">{question.question}</p>
      <div className="space-y-2">
        {Object.entries(question.options).map(([key, value]) => (
          <Button
            key={key}
            onClick={() => handleOptionClick(index, key)}
            className={`w-full ${getButtonStyle(key, question.correctAnswer)} text-white text-wrap text-left break-words text-sm overflow-hidden`}
            disabled={selectedAnswer !== undefined}
          >
            {key}: {value as React.ReactNode}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}