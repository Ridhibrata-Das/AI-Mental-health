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
          <p className="text-xl text-gray-300">
            Begin your journey with PARVATI.AI, where emotional well-being meets cutting-edge technology.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300">
                Start Your Journey
              </button>
            </Link>
          </motion.div>
        </motion.div>
        
        <div className="h-[500px]">
          <Scene />
        </div>
      </div>
    </div>
  );
}