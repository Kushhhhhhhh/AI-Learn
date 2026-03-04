"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WavyBackground from "@/components/animated/wavy-background";
import { HoverBorderGradient } from "@/components/animated/hover-border-gradient";
import { textVariants } from "@/styles/text-variant";
import { containerVariants } from "@/styles/container-variant";
import {
  ArrowRight,
  BookOpen,
  Code,
  Brain,
  History,
  Sparkles,
  Zap,
  Gamepad2,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Topic Modularization",
      description:
        "Break down complex topics into digestible modules for systematic learning",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Smart MCQ Tests",
      description:
        "Generate adaptive multiple-choice questions to reinforce your understanding",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "LeetCode Solutions",
      description:
        "Get solutions in multiple programming languages with detailed explanations",
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Story Mode Learning",
      description:
        "Transform any topic into engaging stories - Comedy, Horror, or Action!",
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Learning History",
      description:
        "Never lose your progress with automatic history tracking for easy revision",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Explanations",
      description:
        "Get personalized explanations, examples, and analogies tailored to you",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "50K+", label: "Topics Explained" },
    { number: "100K+", label: "MCQs Generated" },
    { number: "95%", label: "Satisfaction Rate" },
  ];

  const storyGenres = [
    { name: "Comedy", emoji: "😄", color: "from-yellow-500 to-orange-500" },
    { name: "Horror", emoji: "👻", color: "from-purple-600 to-pink-600" },
    { name: "Action", emoji: "⚡", color: "from-red-500 to-blue-500" },
    { name: "Adventure", emoji: "🗺️", color: "from-green-500 to-teal-500" },
  ];

  return (
    <main className="bg-black">
      {/* Hero Section with Wavy Background */}
      <div className="relative w-full h-screen overflow-hidden">
        <WavyBackground className="absolute inset-0 z-0 w-full h-full" />

        <div className="absolute inset-0 z-10 w-full px-4">
          <div className="max-w-5xl mx-auto text-center flex justify-center items-center h-full flex-col">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-6"
            >
              Crush Concepts with <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">AILearn</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto text-gray-200 text-base sm:text-lg md:text-xl mb-8"
            >
              Empower your learning with AI-driven explanations, examples, and analogies. 
              From complex theories to new skills, we've got you covered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <Link href="/learn">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center space-x-2 px-8 py-4 text-lg font-medium"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </HoverBorderGradient>
              </Link>

              <motion.img
                src="/logo.png"
                alt="AILearn Logo"
                className="w-28 sm:w-32 md:w-40 object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Master Any Topic
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to make learning engaging, effective, and fun
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Mode Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn Through Stories
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform any topic into an engaging story with your preferred genre
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {storyGenres.map((genre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`p-6 rounded-xl bg-gradient-to-br ${genre.color} text-center cursor-pointer`}
              >
                <span className="text-4xl mb-2 block">{genre.emoji}</span>
                <span className="text-white font-semibold">{genre.name}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Example: Learn Quantum Physics
                </h3>
                <p className="text-gray-300">
                  as a comedy story about confused particles
                </p>
              </div>
            </div>
            <p className="text-gray-300 italic">
              "Once upon a time in a tiny atom, there lived an electron named Ellie 
              who couldn't decide where to spin..."
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Learning Journey?
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of learners who are crushing concepts with AILearn
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/learn">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex justify-center items-center space-x-3 px-8 py-4 text-lg font-medium"
                >
                  <span>Get Started Now</span>
                  <Zap className="w-5 h-5" />
                </HoverBorderGradient>
              </Link>

              <Link href="/about">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-transparent text-white border border-white/20 flex justify-center items-center space-x-3 px-8 py-4 text-lg font-medium hover:bg-white/5"
                >
                  <span>Learn more</span>
                </HoverBorderGradient>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 pt-8 text-sm text-gray-500">
              <span>✓ No credit card</span>
              <span>✓ Free forever</span>
              <span>✓ Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}