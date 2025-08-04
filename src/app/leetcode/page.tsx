'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Code } from 'lucide-react';
import { ResponseData } from "@/types/leetcode";
import LeetcodeSheet from "@/components/sheets/leetcode-sheet";

export default function Leetcode() {
  const [problemNumber, setProblemNumber] = useState<string>("");
  const [language, setLanguage] = useState<string>("JavaScript");
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemNumber: problemNumber.trim(),
          language,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Something went wrong.");
        return;
      }

      const data: ResponseData = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Failed to fetch the solution. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
              LeetCode Solver
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            AI-powered solutions for your coding challenges
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="problemNumber" className="text-sm font-medium text-gray-300">
                Problem Number
              </Label>
              <Input
                id="problemNumber"
                type="text"
                value={problemNumber}
                onChange={(e) => setProblemNumber(e.target.value)}
                placeholder="Enter LeetCode problem number"
                required
                className="bg-gray-800 border border-gray-700 text-gray-200 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-sm font-medium text-gray-300">
                Programming Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:border-indigo-500">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-gray-200">
                  <SelectItem value="JavaScript" className="hover:bg-gray-700">JavaScript</SelectItem>
                  <SelectItem value="Python" className="hover:bg-gray-700">Python</SelectItem>
                  <SelectItem value="Java" className="hover:bg-gray-700">Java</SelectItem>
                  <SelectItem value="C++" className="hover:bg-gray-700">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={loading || !problemNumber.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Solution...
                </>
              ) : (
                "Get Solution"
              )}
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-red-900/20 border border-red-800 rounded-lg mb-8"
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-300">Solution Error</h3>
                  <p className="text-xs mt-1 text-red-400">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-800 rounded-lg overflow-hidden"
            >
              <LeetcodeSheet response={response} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}