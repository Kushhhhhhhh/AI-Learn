"use client";

import Link from "next/link";
import WavyBackground from "@/components/animated/wavy-background";
import { HoverBorderGradient } from "@/components/animated/hover-border-gradient";
import { motion } from "framer-motion";
import { textVariants } from "@/styles/text-variant";
import { containerVariants } from "@/styles/container-variant";

export default function Home() {

  return (
    <main className="relative flex flex-col w-full h-screen overflow-hidden">
      <WavyBackground className="absolute inset-0 w-full h-full z-0">
        <div className="relative z-10 flex-1">
          <section className="w-full py-12 md:py-20 lg:py-24 xl:py-32">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center space-y-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div className="space-y-4 text-white mb-6" variants={textVariants}>
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-6xl">
                    Crush Concepts with AILearn
                  </h1>
                  <p className="mx-auto max-w-[700px] text-sm md:text-lg">
                    Empower your learning with AI-driven explanations, examples, and analogies.
                    From complex theories to new skills, we&apos;ve got you covered
                  </p>
                </motion.div>

                <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" variants={textVariants}>
                  <Link href="/learn">
                    <HoverBorderGradient
                      containerClassName="rounded-full"
                      as="button"
                      className="bg-black text-white flex items-center space-x-4 px-8 py-2"
                    >
                      <span>Get Started</span>
                    </HoverBorderGradient>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </WavyBackground>
    </main>
  );
}