"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, BrainCircuit } from "lucide-react";
import { Question } from "@/types/question";
import Particles from "@/components/animated/particles";
import QuestionSheet from "@/components/sheets/question-sheet";

export default function QuizGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const handleGenerateQuestion = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setSelectedAnswers({});

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, difficulty }),
      });

      if (!response.ok) {
        const { error: serverError } = await response.json();
        throw new Error(serverError || "Failed to generate questions.");
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (questionIndex: number, selectedOption: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  return (
    <main className="w-full min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
  
      <Particles className="absolute inset-0 z-0" quantity={150} />

      <div className="max-w-4xl mx-auto relative z-10">
   
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
         
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
              Knowledge Challenge
            </span>
          </h1>
          <p className="text-lg text-gray-400 mx-auto max-w-lg">
            Test your understanding with AI-generated quizzes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                Topic
              </label>
              <Input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., JavaScript fundamentals)"
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger
                  id="difficulty"
                  className="w-full bg-gray-800 border border-gray-700 text-gray-200 focus:border-indigo-500"
                >
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-gray-200">
                  <SelectItem value="Easy" className="hover:bg-gray-700">Easy</SelectItem>
                  <SelectItem value="Intermediate" className="hover:bg-gray-700">Intermediate</SelectItem>
                  <SelectItem value="Expert" className="hover:bg-gray-700">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerateQuestion}
              disabled={loading || !topic || !difficulty}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-8"
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-300">Error Generating Quiz</h3>
                  <p className="text-xs mt-1 text-red-400">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <QuestionSheet
                questions={questions}
                selectedAnswers={selectedAnswers}
                handleOptionClick={handleOptionClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}