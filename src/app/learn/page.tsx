'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse } from '@/types/api-response';
import Particles from "@/components/animated/particles";
import ConceptSheet from '@/components/sheets/concept-sheet';

export default function Learn() {

  const [concept, setConcept] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/learn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Failed to fetch explanation.');
      }

      const data: ApiResponse = await res.json();
      setResponse(data);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Particles className="absolute inset-0 z-0 bg-center bg-fixed" quantity={200} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <Card className="">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold text-center text-gray-100 flex items-center justify-center space-x-4">
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-blue-400 p-2'>Smart Learning for Curious Minds</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="concept" className="text-xl font-semibold text-gray-300">
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
                  className="text-red-400 text-sm mt-2"
                >
                  <strong>Error:</strong> {error}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {response && (
                <ConceptSheet response={response} />
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}