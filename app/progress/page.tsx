"use client";

import { MoodChart } from "./components/mood-chart";
import { Achievements } from "./components/achievements";

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MoodChart />
        <Achievements />
      </div>
    </div>
  );
}