'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Loader2, Code2, Lightbulb, BookOpen, Terminal } from 'lucide-react'
import { ResponseData } from "@/types/leetcode"

export default function Leetcode() {

  const [problemNumber, setProblemNumber] = useState<string>("")
  const [language, setLanguage] = useState<string>("JavaScript")
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResponse(null)

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
      })

      if (!res.ok) {
        const errData = await res.json()
        setError(errData.error || "Something went wrong.")
        return
      }

      const data: ResponseData = await res.json()
      setResponse(data)
    } catch (err) {
      setError("Failed to fetch the solution. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-2xl sm:text-3xl text-center mb-10 md:text-4xl font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LeetCode Problem Solver
        </motion.h1>

        <Card className="bg-gray-900 border-gray-700 shadow-lg">
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

        <AnimatePresence>
          {error && (
            <motion.div 
              className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-100 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {response && (
            <motion.div 
              className="mt-8 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-400 flex items-center">
                    <BookOpen className="mr-2" /> Problem Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><span className="text-indigo-200">Number: {response.problemNumber}</span></p>
                  <p><span className="text-indigo-200">Title: {response.title}</span></p>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-300">Problem Description</h3>
                    <p className="text-gray-300">{response.story}</p>
                    <p className="mt-2 text-gray-300">{response.problemStatement}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-400 flex items-center">
                    <Lightbulb className="mr-2" /> Hints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {response.hints.map((hint, index) => (
                      <li key={index} className="text-gray-300">{hint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-yellow-200 flex items-center">
                    <Code2 className="mr-2" /> Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                    {Array.isArray(response.solution) ? (
                      response.solution.map((sol, index) => (
                        <div key={index} className="mb-4">
                          <p className="font-semibold mb-2 text-blue-300 flex items-center">
                            <Terminal className="mr-2" /> Language: {sol.language}
                          </p>
                          <pre className="bg-black p-4 rounded-lg overflow-auto text-green-400">
                            <code>{sol.code}</code>
                          </pre>
                        </div>
                      ))
                    ) : typeof response.solution === "object" ? (
                      <div>
                        <p className="font-semibold mb-2 text-blue-300 flex items-center">
                          <Terminal className="mr-2" /> Language: {response.solution.language}
                        </p>
                        <pre className="bg-black p-4 rounded-lg overflow-auto text-green-100">
                          <code>{response.solution.code}</code>
                        </pre>
                      </div>
                    ) : (
                      <pre className="bg-black p-4 rounded-lg overflow-auto text-green-200">
                        <code>{response.solution}</code>
                      </pre>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}