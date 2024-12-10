"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const achievements = [
  {
    title: "Session Streak",
    progress: 70,
    description: "7 days in a row!",
  },
  {
    title: "Emotional Awareness",
    progress: 85,
    description: "Great progress in identifying emotions",
  },
  {
    title: "Coping Strategies",
    progress: 60,
    description: "Learning new techniques",
  },
];

export function Achievements() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{achievement.title}</span>
              <span className="text-gray-500">{achievement.progress}%</span>
            </div>
            <Progress value={achievement.progress} />
            <p className="text-sm text-gray-500">{achievement.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}