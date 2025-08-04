"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StorySheet from "@/components/sheets/story-sheet";
import { Story } from "@/types/story";
import { BookOpen, Loader2 } from "lucide-react";
import Particles from "@/components/animated/particles";

const StoryMode = () => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("comedy");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStorify = async () => {
    if (!topic.trim()) {
      setError("Please provide a topic for your story.");
      return;
    }

    setLoading(true);
    setError(null);
    setStory(null);

    try {
      const response = await fetch("/api/story-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, genre }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story.");
      }

      const data = await response.json();
      setStory(data);
    } catch (err) {
      console.error("Error generating story:", err);
      setError("Something went wrong while generating your story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-gray-100 px-4 py-12 sm:px-8">
      <Particles className="absolute inset-0 z-0"/>
      <div className="relative max-w-3xl mx-auto z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
              Story Mode
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            Learn concepts through engaging, AI-generated stories
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-8"
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                What concept would you like to learn?
              </Label>
              <Input
                id="topic"
                type="text"
                placeholder="Enter a topic (e.g., Quantum Physics)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 focus:border-indigo-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-300 mb-2">
                Choose your story genre
              </Label>
              <RadioGroup
                value={genre}
                onValueChange={setGenre}
                className="flex flex-wrap gap-4"
              >
                {[
                  { value: "comedy", label: "Comedy" },
                  { value: "adventure", label: "Adventure" },
                  { value: "mystery", label: "Mystery" },
                  { value: "scifi", label: "Sci-Fi" }
                ].map((g) => (
                  <div key={g.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={g.value}
                      id={g.value}
                      className="border-gray-600 text-indigo-500 data-[state=checked]:bg-indigo-600"
                    />
                    <Label htmlFor={g.value} className="text-gray-300 cursor-pointer">
                      {g.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-red-900/20 border border-red-800 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-red-300">Error</h3>
                      <p className="text-xs mt-1 text-red-400">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleStorify}
              disabled={loading || !topic.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Crafting Your Story...
                </>
              ) : (
                "Generate Story"
              )}
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {story && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className=" rounded-lg overflow-hidden"
            >
              <StorySheet story={story} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default StoryMode;