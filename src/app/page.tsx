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

      <div className="absolute inset-0 z-10 flex items-center justify-center w-full px-4 py-12 md:py-20 bg-transparent">
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
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-8xl leading-tight">
                Crush Concepts with AILearn
              </h1>
              <p className="mx-auto max-w-3xl text-gray-200 text-base md:text-lg lg:text-xl">
                Empower your learning with AI-driven explanations, examples, and analogies. 
                From complex theories to new skills, we've got you covered.
              </p>
            </motion.div>

            <motion.div 
              className="flex w-full flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4"
              variants={textVariants}
            >
              <Link 
                href="/learn" 
                className="w-full sm:w-auto"
              >
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-black text-white flex w-full justify-center items-center space-x-4 px-8 py-3 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>Get Started</span>
                </HoverBorderGradient>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}