"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockData = [
  { day: 'Mon', mood: 8, anxiety: 3, energy: 7 },
  { day: 'Tue', mood: 6, anxiety: 5, energy: 5 },
  { day: 'Wed', mood: 7, anxiety: 4, energy: 6 },
  { day: 'Thu', mood: 9, anxiety: 2, energy: 8 },
  { day: 'Fri', mood: 7, anxiety: 3, energy: 7 },
  { day: 'Sat', mood: 8, anxiety: 2, energy: 8 },
  { day: 'Sun', mood: 9, anxiety: 1, energy: 9 },
];

const metrics = [
  { id: 'mood', name: 'Mood', color: '#8b5cf6' },
  { id: 'anxiety', name: 'Anxiety', color: '#ec4899' },
  { id: 'energy', name: 'Energy', color: '#f59e0b' },
];

export function MoodChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select defaultValue="week">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }} />
              <span className="text-sm text-gray-600">{metric.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px',
              }}
            />
            {metrics.map((metric) => (
              <Line
                key={metric.id}
                type="monotone"
                dataKey={metric.id}
                stroke={metric.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id} className="p-4">
            <div className="text-sm text-gray-600">{metric.name} Average</div>
            <div className="text-2xl font-semibold" style={{ color: metric.color }}>
              {(mockData.reduce((acc, curr) => acc + curr[metric.id], 0) / mockData.length).toFixed(1)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}