"use client";

import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";

interface CallControlsProps {
  isMicOn: boolean;
  isVideoOn: boolean;
  isInCall: boolean;
  onMicToggle: () => void;
  onVideoToggle: () => void;
  onCallToggle: () => void;
}

export function CallControls({
  isMicOn,
  isVideoOn,
  isInCall,
  onMicToggle,
  onVideoToggle,
  onCallToggle,
}: CallControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        variant={isMicOn ? "default" : "destructive"}
        size="lg"
        onClick={onMicToggle}
        className="rounded-full w-12 h-12 p-0"
      >
        {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
      </Button>
      <Button
        variant={isInCall ? "destructive" : "default"}
        size="lg"
        onClick={onCallToggle}
        className="rounded-full w-12 h-12 p-0"
      >
        {isInCall ? <PhoneOff className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
      </Button>
      <Button
        variant={isVideoOn ? "default" : "destructive"}
        size="lg"
        onClick={onVideoToggle}
        className="rounded-full w-12 h-12 p-0"
      >
        {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
      </Button>
    </div>
  );
}