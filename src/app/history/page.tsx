"use client";

import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HistoryCard from "@/components/custom/HistoryCard";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { HistoryItem } from "@/types/history-item";

export default function History() {
  
  const { user } = useUser();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history");

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error fetching history");
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`/api/history?_id=${_id}`); 
      setHistory((prevHistory) => prevHistory.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };
   

  const handleToggleResponse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="w-8 h-8 animate-spin mr-2" />
        <span className="text-xl">Loading your history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        <span className="text-xl">😔 {error}</span>
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-center gap-4 mb-12">
  <motion.h1 
    className="text-4xl font-bold text-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    Your Progress
  </motion.h1>
  <motion.img
    src="/logo-2.png"
    alt="Progress Icon"
    className="w-10 h-10 object-contain"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  />
</div>

      {history.length === 0 ? (
        <motion.div 
          className="text-center text-gray-400 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No history found. Start learning to see your progress!
        </motion.div>
      ) : (
        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {history.map((item, index) => (
            <HistoryCard 
              key={index} 
              item={item} 
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggleResponse(index)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </motion.div>
      )}
    </main>
  );
}