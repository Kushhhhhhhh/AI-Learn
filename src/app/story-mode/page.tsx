"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StorySheet from "@/components/sheets/story-sheet";
import { Story } from "@/types/story";

const StoryMode = () => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("comedy");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStorify = async () => {
    if (!topic.trim() || !genre) {
      setError("Please provide both a topic and a genre.");
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center bg-black text-white px-4 py-8 sm:px-8 md:px-16 lg:px-24"
    >
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
        className="w-full max-w-3xl rounded-lg p-6 sm:p-10 shadow-none"
      >
        <header className="flex items-center justify-center gap-4 mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-indigo-100 to-blue-200 p-1">
            Topic In, Story Out
          </h1>
          <img
            src="/logo-2.png"
            alt="Story Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </header>

        <section className="space-y-8">
          <div>
            <Label
              htmlFor="topic"
              className="text-base font-semibold text-gray-200 mb-2 block"
            >
              Topic you want to understand
            </Label>
            <Input
              id="topic"
              type="text"
              placeholder="Enter your topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-200 mb-2 block">
              Choose your story genre
            </Label>
            <RadioGroup
              value={genre}
              onValueChange={setGenre}
              className="flex flex-wrap gap-6"
              aria-label="Select story genre"
            >
              {["horror", "comedy", "action"].map((g) => (
                <div key={g} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={g}
                    id={g}
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label
                    htmlFor={g}
                    className="capitalize text-gray-200 cursor-pointer select-none"
                  >
                    {g}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-red-500 text-sm leading-relaxed text-center"
              role="alert"
            >
              <strong>Oops!</strong> {error || "Something went wrong while processing your request. Our application might have encountered an issue."}
              <br />
              <span className="text-gray-300">Please try again in a few moments. If the problem persists, let us know!</span>
            </motion.div>
          )}

          <motion.div className="w-full flex justify-center">
            <Button
              onClick={handleStorify}
              disabled={loading}
              className="bg-gradient-to-b from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-4 px-8 text-lg rounded-full transition-shadow duration-300 shadow-lg hover:shadow-xl"
              aria-live="polite"
              aria-busy={loading}
            >
              {loading ? "Writing your story..." : "Storify"}
            </Button>
          </motion.div>

          {story && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <StorySheet story={story} />
            </motion.div>
          )}
        </section>
      </motion.div>
    </motion.main>
  );
};

export default StoryMode;