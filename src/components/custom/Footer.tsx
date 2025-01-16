"use client";

import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false });

const Footer = () => {
  return (
    <footer className="bg-black text-white flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
      <p className="text-xs md:text-base text-center sm:text-left">
        © 2025 AILearn | All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 lg:gap-10 justify-center sm:justify-end">
        <Link
          href="https://x.com/KushSha06747704"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MotionDiv
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTwitter className="w-5 h-5" />
          </MotionDiv>
        </Link>
        <Link
          href="https://linkedin.com/in/kushsharma738"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MotionDiv
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin className="h-5 w-5" />
          </MotionDiv>
        </Link>
        <Link
          href="https://github.com/Kushhhhhhhh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MotionDiv
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="h-5 w-5" />
          </MotionDiv>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;