"use client";

import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { CallControls } from "./components/call-controls";
import { VideoStream } from "./components/video-stream";
import { FacialAnalysis } from "./components/facial-analysis";
import { AIChat } from "./components/ai-chat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

export default function VideoCallPage() {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const setupMediaStream = async () => {
      try {
        if (isInCall) {
          // Stop any existing stream
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }

          // Get new media stream
          const stream = await navigator.mediaDevices.getUserMedia({
            video: isVideoOn,
            audio: isMicOn,
          });

          // Store the stream reference
          streamRef.current = stream;

          // Update video element if it exists
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Ensure audio is enabled when mic is on
            videoRef.current.muted = !isMicOn;
          }
        } else {
          // Stop all tracks when not in call
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
          }
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      } catch (err) {
        console.error("Media setup error:", err);
        // Reset states on error
        if (err instanceof Error && err.name === "NotAllowedError") {
          setIsVideoOn(false);
          setIsMicOn(false);
        }
      }
    };

    setupMediaStream();

    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isInCall, isVideoOn, isMicOn]);

  const handleCallToggle = () => {
    if (!isInCall) {
      setIsInCall(true);
      setIsVideoOn(true);
      setIsMicOn(true);
    } else {
      setIsInCall(false);
      setIsVideoOn(false);
      setIsMicOn(false);
    }
  };

  const handleEmotionDetected = (emotion: string) => {
    setCurrentEmotion(emotion);
  };

  const handleMicToggle = async () => {
    try {
      if (!isMicOn && isInCall) {
        // Request microphone permission when turning on
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      setIsMicOn(!isMicOn);
    } catch (err) {
      console.error("Microphone permission error:", err);
    }
  };

  const handleVideoToggle = async () => {
    try {
      if (!isVideoOn && isInCall) {
        await navigator.mediaDevices.getUserMedia({ video: true });
      }
      setIsVideoOn(!isVideoOn);
    } catch (err) {
      console.error("Video permission error:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Video Session</h1>
          <div className="flex gap-2">
            {currentEmotion && (
              <Badge variant="outline">
                Emotion: {currentEmotion}
              </Badge>
            )}
            <Badge variant={isInCall ? "default" : "secondary"}>
              {isInCall ? "In Call" : "Not Connected"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 min-h-[600px]">
          <div className="relative h-full">
            <VideoStream 
              type="ai" 
              isVideoOn={true}
            />
          </div>
          <div className="relative h-full">
            <VideoStream
              type="user"
              isVideoOn={isVideoOn && isInCall}
              isMicOn={isMicOn && isInCall}
              webcamRef={webcamRef}
              videoRef={videoRef}
            />
            {isVideoOn && isInCall && (
              <FacialAnalysis
                videoRef={videoRef}
                onEmotionDetected={handleEmotionDetected}
              />
            )}
          </div>
        </div>

        {/* Chat Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed right-4 top-24 z-50"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>

        {/* Chat Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isChatOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="h-full pt-20">
            <AIChat
              currentEmotion={currentEmotion}
              isInCall={isInCall}
            />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm fixed bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto">
            <CallControls
              isMicOn={isMicOn}
              isVideoOn={isVideoOn}
              isInCall={isInCall}
              onMicToggle={handleMicToggle}
              onVideoToggle={handleVideoToggle}
              onCallToggle={handleCallToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}