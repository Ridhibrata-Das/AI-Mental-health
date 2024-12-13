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
          audio: isMicOn
        });

        // Set the stream to both webcam and video elements
        if (webcamRef.current) {
          const webcam = webcamRef.current as any;
          webcam.video.srcObject = stream;
        }

        if (videoRef?.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera/mic:", err);
      }
    }
  }, [isVideoOn, isMicOn, type, webcamRef, videoRef]);

  useEffect(() => {
    if (isVideoOn || isMicOn) {
      startVideo();
    } else {
      // Clean up video streams when video is turned off
      if (videoRef?.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (webcamRef?.current) {
        const webcam = webcamRef.current as any;
        if (webcam.video?.srcObject) {
          const stream = webcam.video.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  }, [isVideoOn, isMicOn, startVideo]);

  useEffect(() => {
    if (type === "ai" && iframeRef.current) {
      // Add event listener for messages from iframe
      const handleMessage = (event: MessageEvent) => {
        if (event.data && typeof event.data === 'string') {
          console.log('Widget message:', event.data);
          
          // Check if the message indicates audio issues
          if (event.data.includes('audio') || event.data.includes('sound')) {
            console.log('Audio-related message received from widget');
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [type]);

  if (type === "ai") {
    return (
      <div className="w-full h-full aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe 
            ref={iframeRef}
            id="audio_iframe" 
            src="https://widget.synthflow.ai/widget/v2/1734118370620x218015710862244480/1734118370309x121081012185592080" 
            allow="microphone *; camera *; clipboard-write; display-capture *; autoplay *; speaker *"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              minHeight: '600px'
            }}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads allow-modals allow-presentation"
            onLoad={() => {
              console.log('Widget iframe loaded');
              // Try to unmute the iframe content
              if (iframeRef.current) {
                try {
                  // Send a message to the iframe to unmute
                  iframeRef.current.contentWindow?.postMessage({ type: 'unmute' }, '*');
                  console.log('Sent unmute message to widget');
                } catch (err) {
                  console.error('Error sending unmute message:', err);
                }
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <Card className="aspect-video bg-gray-100 relative overflow-hidden">
      {type === "user" && (isVideoOn || isMicOn) && (
        <>
          <Webcam
            ref={webcamRef}
            className="absolute inset-0 w-full h-full object-cover"
            audio={isMicOn}
            muted={true}
            autoPlay
            playsInline
            mirrored
            onUserMedia={startVideo}
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
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
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