"use client";

import Link from "next/link";
import WavyBackground from "@/components/animated/wavy-background";
import { HoverBorderGradient } from "@/components/animated/hover-border-gradient";
import { motion } from "framer-motion";
import { textVariants } from "@/styles/text-variant";
import { containerVariants } from "@/styles/container-variant";

export default function Home() {
  return (
    <main className="relative w-full h-[90vh] overflow-hidden bg-transparent">

      <WavyBackground className="absolute inset-0 z-0 w-full h-full" />

      <div className="absolute inset-0 z-10 flex justify-center w-full px-4 py-12 md:py-20 bg-transparent">
        <section className="w-full max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center space-y-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >

            <motion.div
              className="space-y-6 text-white"
              variants={textVariants}
            >
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl leading-tight">
                Crush Concepts with AILearn
              </h1>
              <p className="mx-auto max-w-3xl text-gray-200 text-base md:text-lg lg:text-xl">
                Empower your learning with AI-driven explanations, examples, and analogies.
                From complex theories to new skills, we've got you covered.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center space-y-6 pt-4"
              variants={textVariants}
            >
              <div className="animate-bounce">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <Link href="/learn">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-black text-white flex justify-center items-center space-x-4 px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>Get Started</span>
                </HoverBorderGradient>
              </Link>
            </motion.div>

          </motion.div>
          <motion.div
            className="flex justify-center items-center w-full mt-16 sm:mt-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/logo.png"
              alt="AILearn Logo"
              className="w-28 sm:w-32 md:w-40 lg:w-48 object-contain"
            />
          </motion.div>
        </section>
      </div>
    </main>
  );
}