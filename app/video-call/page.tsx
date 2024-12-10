"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { CallControls } from "./components/call-controls";
import { VideoStream } from "./components/video-stream";
import { Badge } from "@/components/ui/badge";

export default function VideoCallPage() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleCallToggle = () => {
    setIsInCall(!isInCall);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Video Session</h1>
          <Badge variant={isInCall ? "default" : "secondary"}>
            {isInCall ? "In Call" : "Not Connected"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <VideoStream type="ai" isVideoOn={true} />
          <VideoStream type="user" isVideoOn={isVideoOn} webcamRef={webcamRef} />
        </div>

        <div className="bg-white/80 backdrop-blur-sm fixed bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto">
            <CallControls
              isMicOn={isMicOn}
              isVideoOn={isVideoOn}
              isInCall={isInCall}
              onMicToggle={() => setIsMicOn(!isMicOn)}
              onVideoToggle={() => setIsVideoOn(!isVideoOn)}
              onCallToggle={handleCallToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}