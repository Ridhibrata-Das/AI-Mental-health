"use client";

import { Card } from "@/components/ui/card";
import Webcam from "react-webcam";
import { RefObject, useEffect, useCallback, useRef } from "react";

interface VideoStreamProps {
  isVideoOn: boolean;
  webcamRef?: RefObject<Webcam>;
  videoRef?: RefObject<HTMLVideoElement>;
  type: "user" | "ai";
  isMicOn?: boolean;
}

export function VideoStream({ isVideoOn, webcamRef, videoRef, type, isMicOn }: VideoStreamProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const startVideo = useCallback(async () => {
    if (type === "user" && (isVideoOn || isMicOn) && webcamRef?.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isVideoOn,
          audio: isMicOn,
        });
        webcamRef.current.video!.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }
  }, [isVideoOn, isMicOn, webcamRef, type]);

  useEffect(() => {
    startVideo();
    return () => {
      if (webcamRef?.current?.video?.srcObject) {
        const tracks = (webcamRef.current.video.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [startVideo, webcamRef]);

  return (
    <Card className="w-full h-full min-h-[600px]">
      {type === "ai" && (
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src="https://widget.synthflow.ai/widget/v2/1734118370620x218015710862244480/1734118370309x121081012185592080"
            allow="microphone *; camera *; clipboard-write; display-capture *; autoplay *; speaker *"
            className="w-full h-full"
            style={{
              border: 'none',
              background: 'transparent',
              minHeight: '600px',
              height: '100%'
            }}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-presentation"
            onLoad={() => {
              console.log('Widget iframe loaded');
              if (iframeRef.current) {
                try {
                  iframeRef.current.contentWindow?.postMessage({ type: 'unmute' }, '*');
                  console.log('Sent unmute message to widget');
                } catch (err) {
                  console.error('Error sending unmute message:', err);
                }
              }
            }}
          />
        </div>
      )}
      {type === "user" && (isVideoOn || isMicOn) && (
        <>
          <Webcam
            ref={webcamRef}
            audio={isMicOn}
            video={isVideoOn}
            className="w-full h-full object-cover"
          />
          <video
            ref={videoRef}
            className="hidden"
            muted
            autoPlay
            playsInline
          />
        </>
      )}
      {(!isVideoOn && !isMicOn) && (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">
              {type === "ai" ? "AI Therapist" : "Camera & Mic Off"}
            </h3>
            <p className="text-gray-500">
              {type === "ai" ? "Ready to listen" : "Video and audio are disabled"}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}