"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { date: "Mon", mood: 7 },
  { date: "Tue", mood: 6 },
  { date: "Wed", mood: 8 },
  { date: "Thu", mood: 7 },
  { date: "Fri", mood: 9 },
  { date: "Sat", mood: 8 },
  { date: "Sun", mood: 8 },
];

export function MoodChart() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Weekly Mood Tracking</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date"
              padding={{ left: 0, right: 0 }}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              domain={[0, 10]}
              padding={{ top: 20, bottom: 20 }}
              tick={{ fill: '#666' }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}