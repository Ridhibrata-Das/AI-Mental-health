"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scene } from "@/components/three/scene";

export function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-6xl font-bold leading-tight">
            Your Safe Space to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              {" "}Talk and Grow
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Connect with AI therapists, track your emotional well-being, and take control of your mental health journey.
          </p>
          <div className="flex gap-4">
            <Link
              href="/video-call"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Start Session
            </Link>
            <Link
              href="/about"
              className="text-gray-600 border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-square"
        >
          <Scene />
        </motion.div>
      </div>
    </div>
  );
}