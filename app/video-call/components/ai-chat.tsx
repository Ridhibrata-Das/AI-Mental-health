"use client";

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIChatProps {
  currentEmotion?: string;
  isInCall: boolean;
}

export function AIChat({ currentEmotion, isInCall }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastEmotionResponse, setLastEmotionResponse] = useState<string>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentEmotion && isInCall && currentEmotion !== lastEmotionResponse) {
      handleEmotionBasedResponse(currentEmotion);
      setLastEmotionResponse(currentEmotion);
    }
  }, [currentEmotion, isInCall, lastEmotionResponse]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleEmotionBasedResponse = async (emotion: string) => {
    const responses: Record<string, string> = {
      happy: "I'm glad to see you're feeling positive! Would you like to share what's making you happy?",
      sad: "I notice you might be feeling down. Would you like to talk about what's troubling you?",
      angry: "I can see this might be frustrating. Let's take a deep breath together and talk about it.",
      neutral: "How are you feeling about our conversation so far?",
      surprised: "You seem surprised! What's on your mind?",
      fearful: "I'm here to support you. Would you like to share what's causing you concern?",
      disgusted: "Something seems to be bothering you. Would you like to discuss it?"
    };

    const response = responses[emotion] || "How are you feeling right now?";
    
    const lastMessage = messages[messages.length - 1];
    const isDuplicateResponse = lastMessage && lastMessage.content === response;
    
    if (!isDuplicateResponse) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      }]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !isInCall) return;

    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Here you would integrate with your AI service
    setTimeout(() => {
      const responses = [
        "I understand. Could you tell me more about that?",
        "How does that make you feel?",
        "That's interesting. What do you think about that?",
        "I'm here to listen. Would you like to explore that further?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: randomResponse,
          timestamp: Date.now()
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat with AI Therapist</h3>
      </div>
      
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.timestamp}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isInCall ? "Type your message..." : "Join call to chat"}
            disabled={!isInCall}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!isInCall || !input.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
}
