'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-center text-center mb-10 gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-400">
            Your LeetCode
          </h1>
          <span className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400">
            Genie
          </span>
          <img
            src="/logo-2.png"
            alt="Genie Icon"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-200">Enter Problem Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="problemNumber" className="text-gray-300">Problem Number</Label>
                <Input
                  id="problemNumber"
                  type="text"
                  value={problemNumber}
                  onChange={(e) => setProblemNumber(e.target.value)}
                  placeholder="Enter LeetCode problem number"
                  required
                  className="bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-300">Programming Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gray-700 text-gray-300 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-gray-600">
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-blue-600 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Solving...
                  </>
                ) : (
                  "Get Solution"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {response && <LeetcodeSheet response={response} />}
      </div>
    </div>
  );
}