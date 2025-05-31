'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target } from 'lucide-react';
import { aboutInfo } from "@/data/about-info"
import Image from "next/image"
import Link from "next/link"
import { NeonButton } from "@/components/animated/neon-button";
import { GlowCard } from "@/components/animated/glow-card";
import { ParallaxText } from "@/components/animated/parallel-text";

const About = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400"
            >
              About AI Learn
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-300"
            >
              Revolutionizing education through the power of artificial intelligence. Learn smarter, faster, and more effectively with AI Learn.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link href="/learn">
                <NeonButton>Explore AI Learning</NeonButton>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/banner.png"
              alt="AI Learn Banner"
              width={700}
              height={400}
              className="object-cover hover:scale-105 transition duration-300 ease"
            />
          </motion.div>
        </section>

        <ParallaxText baseVelocity={-5}>
          Simplified Learning • Story-Driven Topics • LeetCode Insights • Quiz Generation • Personalized History •
        </ParallaxText>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
  <motion.div
    className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.div variants={itemVariants}>
      <GlowCard
        icon={<Target className="w-10 h-10 text-white" />}
        title="Our Mission"
        content="Empowering learners with AI-driven tools to simplify, personalize, and transform the way they acquire knowledge, one step at a time."
      />
    </motion.div>
    <motion.div variants={itemVariants}>
      <GlowCard
        icon={<Lightbulb className="w-10 h-10 text-white" />}
        title="Our Vision"
        content="To redefine education by creating an interactive, story-driven, and adaptive learning ecosystem tailored to every individual."
      />
    </motion.div>
  </motion.div>
</section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h3 className="text-4xl md:text-7xl font-bold text-white mb-10">Our Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-4xl font-extrabold text-white">22+</p>
              <p className="text-sm text-gray-400">Students Helped</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">92%</p>
              <p className="text-sm text-gray-400">Faster Concept Retention</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">4.5⭐</p>
              <p className="text-sm text-gray-400">Feedback Rating</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-white">5</p>
              <p className="text-sm text-gray-400">Innovative Features</p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-7xl mx-auto p-2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-400"
            >
              The Power of AI in Learning
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutInfo.map((info) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative p-6 bg-gradient-to-br from-blue-950 to-blue-800 rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 transform hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="flex items-center mb-2">
                      <info.icon className="w-14 h-14 text-white mr-4" />
                      <h3 className="text-2xl font-bold text-gray-200">
                        {info.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {info.description}
                    </p>
                  </div>

                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default About;