"use client";

import { Card } from "@/components/ui/card";
import Webcam from "react-webcam";
import { RefObject } from "react";

interface VideoStreamProps {
  isVideoOn: boolean;
  webcamRef?: RefObject<Webcam>;
  type: "user" | "ai";
}

export function VideoStream({ isVideoOn, webcamRef, type }: VideoStreamProps) {
  return (
    <Card className="aspect-video bg-gray-100 relative overflow-hidden">
      {type === "user" && isVideoOn && (
        <Webcam
          ref={webcamRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {(!isVideoOn || type === "ai") && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">
              {type === "ai" ? "AI Therapist" : "Camera Off"}
            </h3>
            <p className="text-gray-500">
              {type === "ai" ? "Ready to listen" : "Video is disabled"}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}