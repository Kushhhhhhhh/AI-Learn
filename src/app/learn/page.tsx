"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@/components/animated/particles";
import ConceptSheet from "@/components/sheets/concept-sheet";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

export default function LearnPage() {
  const [concept, setConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // Simulate an API call
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ concept }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <Particles className="absolute inset-0 z-0" quantity={200} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <Card>
          <CardHeader className="pb-0 text-center">
            <CardTitle>
              <div className="flex items-center gap-4">
                <img
                  src="/logo-2.png"
                  alt="Smart Learning Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-2 object-contain"
                />
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-blue-200">
                  Master Concepts Effortlessly
                </h1>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <label
                htmlFor="concept"
                className="block text-lg sm:text-xl font-semibold text-gray-300"
              >
                Enter a Concept
              </label>
              <div className="relative">
                <Input
                  id="concept"
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="e.g., Machine Learning"
                  className="w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                />
                <Button
                  onClick={handleSubmit}
                  className="absolute right-0 top-0 bottom-0 bg-zinc-800 hover:bg-zinc-950 text-white"
                  disabled={loading || !concept}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm text-center bg-gray-800 rounded-md p-3 shadow-lg"
                >
                  <strong>Oops!</strong> Something went wrong while processing your request. Our Application might have encountered an issue.
                  <br />
                  <span className="text-gray-300">Please try again in a few moments. If the problem persists, let us know!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {response && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ConceptSheet response={response} />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}