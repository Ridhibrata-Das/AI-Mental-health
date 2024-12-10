"use client";

import { MoodChart } from "./components/mood-chart";
import { Achievements } from "./components/achievements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Clock, Target, Brain, Calendar as CalendarIcon, Trophy, Star, Heart } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Your Wellness Journey
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your progress, celebrate achievements, and continue growing on your path to emotional well-being.
        </p>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Quick Actions */}
        <div className="space-y-6">
          {/* Weekly Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Overview</CardTitle>
              <CardDescription>Your activity this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Sessions Completed</span>
                  <Badge>4/5</Badge>
                </div>
                <Progress value={80} className="h-2" />
                <div className="flex justify-between items-center">
                  <span>Mindfulness Minutes</span>
                  <Badge variant="outline">45 mins</Badge>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {[1, 2, 3].map((session) => (
                    <div key={session} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                      <div className="flex-1">
                        <p className="font-medium">Therapy Session {session}</p>
                        <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                      </div>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mood Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Mood Patterns</CardTitle>
              <CardDescription>Your emotional journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <MoodChart />
            </CardContent>
          </Card>

          {/* Goals & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Improve Sleep', 'Daily Meditation', 'Express Feelings'].map((goal) => (
                    <div key={goal} className="flex items-center gap-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Achievements />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Three.js Avatar Preview Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your 3D Avatar</CardTitle>
          <CardDescription>Customize and view your virtual self</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center">
            {/* Three.js canvas will be mounted here */}
            <p className="text-gray-500">3D Avatar Preview Coming Soon</p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Mindfulness Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Mindfulness Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Focus Score</span>
                <Badge variant="secondary">85%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Calm Minutes</span>
                <Badge variant="secondary">120</Badge>
              </div>
              <Button className="w-full" variant="outline">View Details</Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Activity Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>

        {/* Achievement Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((badge) => (
                <div key={badge} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-xs text-center">Badge {badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}