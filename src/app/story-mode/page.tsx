"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StorySheet from "@/components/sheets/story-sheet";
import { Story } from "@/types/story"

const StoryMode = () => {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("comedy");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStorify = async () => {
    if (!topic || !genre) {
      setError("Please provide both a topic and a genre.");
      return;
    }

    setLoading(true);
    setError(null);
    setStory(null);

    try {
      const response = await fetch("/api/story-mode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, genre }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story.");
      }

      const data = await response.json();
      setStory(data);
    } catch (err) {
      console.error("Error generating story:", err);
      setError("An error occurred while generating the story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center bg-black text-white px-6 py-4 md:px-20 md:py-12"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md md:max-w-2xl h-full p-8 rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center gap-3 mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-blue-400 p-2">
            Story Mode
          </h1>
          <img
            src="/logo-2.png"
            alt="Story Icon"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="topic" className="text-sm font-medium text-gray-200 mb-2 block">
              Topic you want to understand
            </Label>
            <Input
              id="topic"
              type="text"
              placeholder="Enter your topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-200 mb-2 block">Choose your story genre</Label>
            <RadioGroup value={genre} onValueChange={setGenre} className="flex justify-between">
              {["horror", "comedy", "action"].map((g) => (
                <div key={g} className="flex items-center space-x-2">
                  <RadioGroupItem
  value={g}
  id={g}
  className="bg-black border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
/>
                  <Label htmlFor={g} className="capitalize">
                    {g}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleStorify}
              disabled={loading}
              className="w-full bg-gradient-to-b from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
            >
              {loading ? "Writing your story..." : "Storify"}
            </Button>
          </motion.div>

          {story && <StorySheet story={story} />}
        </div>
      </motion.div>
    </motion.main>
  );
};

export default StoryMode;