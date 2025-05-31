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
import { Loader2 } from "lucide-react";
import { Question } from "@/types/question";
import Particles from "@/components/animated/particles";
import QuestionSheet from "@/components/sheets/question-sheet";
import { TextShimmer } from "@/components/ui/text-shimmer";

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
    <main className="w-full min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Particles className="absolute inset-0 z-0" quantity={100} />
      <div className="max-w-4xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-lg shadow-xl p-6 mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 flex items-center justify-center space-x-4"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-indigo-100 to-blue-200">
              Let's See What You Know
            </h1>
            <img
              src="/logo-2.png"
              alt="Quiz Icon"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </motion.div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="topic"
                className="text-sm md:text-lg font-medium text-gray-300 block mb-2"
              >
                Topic
              </label>
              <Input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (e.g., JavaScript fundamentals)"
                className="w-full bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="difficulty"
                className="text-sm md:text-lg font-medium text-gray-300 block mb-2"
              >
                Difficulty
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger
                  id="difficulty"
                  className="w-full bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                >
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerateQuestion}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              disabled={loading || !topic || !difficulty}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <TextShimmer className="font-mono text-sm" duration={1}>
                    Generating your questions...
                  </TextShimmer>
                </>
              ) : (
                "Generate Question Paper"
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
              className="bg-red-900 text-red-100 p-4 rounded-md mb-8"
            >
              <strong>Oops!</strong> Something went wrong while processing your request. Our application might have encountered an issue.
              <br />
              <span className="text-gray-300">
                Please try again in a few moments. If the problem persists, let us know!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {questions.length > 0 && (
            <QuestionSheet
              questions={questions}
              selectedAnswers={selectedAnswers}
              handleOptionClick={handleOptionClick}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}