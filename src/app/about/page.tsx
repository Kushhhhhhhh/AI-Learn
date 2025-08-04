'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target } from 'lucide-react';
import { aboutInfo } from "@/data/about-info"
import Image from "next/image"
import Link from "next/link"
import { NeonButton } from "@/components/animated/neon-button";
import { GlowCard } from "@/components/animated/glow-card";
import { ParallaxText } from "@/components/animated/parallel-text";
import CountUp from 'react-countup';
import { Users, BarChart2, Star, Rocket } from 'lucide-react';

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
              width={1000}
              height={600}
              className="object-cover hover:scale-105 transition duration-300 ease"
            />
          </motion.div>
        </section>

        <section className='max-w-5xl mx-auto'>
          <ParallaxText baseVelocity={-5}>
            Simplified Learning • Story-Driven Topics • LeetCode Insights • Quiz Generation • Personalized History •
          </ParallaxText>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3
                  }
                }
              }}
            >

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 100 }
                  }
                }}
              >
                <div className="h-full p-8 bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden relative group hover:border-blue-400/40 transition-all duration-500">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">
                        Our Learning Mission
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      We're building more than just explanations - we're creating <span className="font-semibold text-blue-300">active learning experiences</span> that combine AI-powered guidance with cognitive science principles to help you <span className="font-semibold text-blue-300">actually retain</span> what you learn.
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-800">
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Spaced repetition algorithms
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Interactive problem-solving
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Contextual concept mapping
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 100, delay: 0.2 }
                  }
                }}
              >
                <div className="h-full p-8 bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden relative group hover:border-purple-400/40 transition-all duration-500">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mr-4">
                        <Lightbulb className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-300">
                        Our Educational Vision
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Imagine a learning companion that adapts not just to <span className="font-semibold text-purple-300">what</span> you know, but <span className="font-semibold text-purple-300">how</span> you learn best. We're creating AI that understands your unique cognitive patterns to deliver <span className="font-semibold text-purple-300">truly personalized</span> education.
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-800">
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          Learning style detection
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          Dynamic difficulty adjustment
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          Multimodal explanations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.h3
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Impact</span>
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:rotate-6 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-2">
                  <CountUp end={19} duration={2} />+
                </p>
                <p className="text-sm text-gray-400">Students Helped</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg group-hover:rotate-6 transition-transform duration-300">
                    <BarChart2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-2">92%</p>
                <p className="text-sm text-gray-400">Faster Retention</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-yellow-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg group-hover:rotate-6 transition-transform duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-2">4.5<span className="text-yellow-400">⭐</span></p>
                <p className="text-sm text-gray-400">Feedback Rating</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg group-hover:rotate-6 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-2">5+</p>
                <p className="text-sm text-gray-400">Innovative Features</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.2
                  }
                }
              }}
              className="text-center mb-16"
            >
              <motion.h2
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white"
              >
                The Power of AI in Learning
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Harness cutting-edge AI to transform how you understand complex concepts
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aboutInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                  <div className="h-full p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:border-blue-400/30 hover:shadow-blue-500/20">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mt-1">
                          {info.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 mb-4 flex-grow">
                        {info.description}
                      </p>
                      <div className="mt-auto">
                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default About;