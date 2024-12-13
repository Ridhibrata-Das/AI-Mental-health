"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  gradient: string;
}

export function FeatureCard({ title, description, gradient }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-lg`}
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-100">{description}</p>
      </div>
    </motion.div>
  );
}