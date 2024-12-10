"use client";

import { Button } from "@/components/ui/button";
import { Brain, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl font-bold text-gray-900 animate-fade-in">
            Your Safe Space to Talk and Grow
          </h1>
          <p className="text-xl text-gray-600">
            A friendly place where you can share your thoughts and feelings with a caring AI companion
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8 text-purple-600" />}
            title="Talk Anytime"
            description="Have meaningful conversations with your AI companion whenever you need someone to listen"
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-purple-600" />}
            title="Learn & Grow"
            description="Develop emotional intelligence and coping skills through interactive sessions"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-purple-600" />}
            title="Safe & Private"
            description="Your conversations are private and secure, creating a safe space for expression"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-purple-50 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}