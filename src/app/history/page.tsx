"use client";

import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoryCard } from "@/components/custom/HistoryCard";
import { Loader2, BookOpen, History as HistoryIcon } from "lucide-react";
import axios from "axios";
import { HistoryItem } from "@/types/history-item";
import Link from "next/link"

export default function History() {
  const { user } = useUser();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/history");
        
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data.sort((a: HistoryItem, b: HistoryItem) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error fetching history");
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleDelete = async (_id: string) => {
    try {
      setDeletingId(_id);
      await axios.delete(`/api/history?_id=${_id}`); 
      setHistory(prev => prev.filter(item => item._id !== _id));
    } catch (error) {
      console.error("Error deleting history:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleResponse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mb-4" />
          <h2 className="text-2xl font-medium">Analyzing your learning journey</h2>
          <p className="text-gray-400 mt-2">Gathering your progress data...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md"
        >
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-medium text-red-400 mb-2">Couldn't load your history</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.header 
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              className="p-3 bg-blue-900/30 rounded-full"
              whileHover={{ rotate: 10 }}
            >
              <HistoryIcon className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Learning Journey
            </h1>
          </div>
          <p className="text-gray-400 text-center max-w-lg">
            Review your progress, revisit explanations, and track your understanding over time
          </p>
        </motion.header>

        {history.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BookOpen className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl text-gray-300 mb-2">Your learning history is empty</h2>
            <p className="text-gray-500 max-w-md mb-6">
              Start exploring topics to see your progress and saved explanations appear here.
            </p>
            <Link
              href="/learn"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all"
            >
              Start Learning Now
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <HistoryCard 
                    item={item} 
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggleResponse(index)}
                    onDelete={() => handleDelete(item._id)}
                    isDeleting={deletingId === item._id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}