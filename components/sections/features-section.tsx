"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "@/components/ui/feature-card";

export function FeaturesSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <FeatureCard
          title="Interactive Sessions"
          description="Engage in meaningful conversations with our AI companion in a gamified environment"
          gradient="from-pink-500 to-rose-500"
        />
        <FeatureCard
          title="Track Progress"
          description="Watch your emotional intelligence grow through beautiful visualizations"
          gradient="from-purple-500 to-indigo-500"
        />
        <FeatureCard
          title="Earn Rewards"
          description="Complete milestones and unlock achievements as you progress"
          gradient="from-cyan-500 to-blue-500"
        />
      </motion.div>
    </div>
  );
}