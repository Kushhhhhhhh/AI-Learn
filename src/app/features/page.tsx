"use client";

import { features } from "@/data/features"
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/custom/FeatureCard";
import { AnimatedTitle } from "@/components/animated/animated-title";

const Features = () => {
  return (
    <section className="relative min-h-screen w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-black via-zinc-950 to-zinc-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
          transition: {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          },
        }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23333333" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedTitle>Powerful Features</AnimatedTitle>
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.Icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;