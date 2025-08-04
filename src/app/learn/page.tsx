"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@/components/animated/particles";
import ConceptSheet from "@/components/sheets/concept-sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Sparkles, BrainCircuit, Lightbulb } from "lucide-react";
import { ApiResponse } from "@/types/api-response";

const exampleConcepts = [
  "Quantum computing basics",
  "How neural networks learn",
  "The theory of relativity",
  "Blockchain technology explained",
  "Photosynthesis process"
];

export default function LearnPage() {
  const [concept, setConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!concept.trim()) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ concept }),
      });

      if (!res.ok) {
        throw new Error(await res.text() || "Failed to fetch data");
      }

      const data: ApiResponse = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate explanation");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setConcept(example);
  };

  return (
    <main className="w-full min-h-screen text-gray-100 relative overflow-hidden">

      <Particles className="absolute inset-0 z-0" quantity={150} color="#3b82f6" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >

          <div className="text-center mb-12">
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-200">
                Explore Any Concept — Instantly
              </span>
            </h1>
            <p className="text-lg text-gray-400 mx-auto max-w-lg">
              Confused by a topic? Let AI break it down with fun, clear explanations you'll actually remember.
            </p>
          </div>

          <Card className="bg-gray-950 border border-gray-800 overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl font-medium flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-md">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-200">Explore Concepts</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <Textarea
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Describe any concept, theory, or process..."
                    className="w-full min-h-[120px] bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500 resize-none"
                    disabled={loading}
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={loading || !concept.trim()}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Insight
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setConcept("")}
                      disabled={loading || !concept}
                      className="px-6 py-3 text-gray-400 hover:text-gray-200 border-gray-700 hover:border-gray-600"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </form>

              <div className="space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</p>
                <div className="flex flex-wrap gap-2">
                  {exampleConcepts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className={`px-3 py-1.5 text-xs rounded-full border ${concept === example
                          ? "bg-indigo-500/10 border-indigo-400 text-indigo-300"
                          : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-600"
                        } transition-colors`}
                    >
                      {example}
                    </button>
                  ))}
                </div>
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

              <AnimatePresence>
                {response && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <ConceptSheet response={response} />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {!response && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
                  title: "AI Insights",
                  description: "Tailored to your knowledge level"
                },
                {
                  icon: <BrainCircuit className="w-6 h-6 text-blue-400" />,
                  title: "Deep Understanding",
                  description: "Beyond surface explanations"
                },
                {
                  icon: <Lightbulb className="w-6 h-6 text-pink-400" />,
                  title: "Practical Examples",
                  description: "Real-world applications"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-950 border border-gray-800 rounded-lg p-5 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="mb-3">
                    <div className="w-10 h-10 rounded-md bg-gray-900 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}