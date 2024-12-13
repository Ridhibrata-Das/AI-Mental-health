"use client";

import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

interface FacialAnalysisProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onEmotionDetected: (emotion: string) => void;
}

export function FacialAnalysis({ videoRef, onEmotionDetected }: FacialAnalysisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    let animationFrame: number;

    const updateCanvasDimensions = () => {
      if (!video || !canvas) return;
      
      // Get the video's actual display size
      const videoRect = video.getBoundingClientRect();
      canvas.width = videoRect.width;
      canvas.height = videoRect.height;
      
      // Scale the canvas to match video dimensions
      const scaleX = videoRect.width / video.videoWidth;
      const scaleY = videoRect.height / video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(scaleX, scaleY);
      }
    };

    const detectEmotions = async () => {
      if (!video || !canvas) return;

      try {
        updateCanvasDimensions();

        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detections) {
          // Reset the scale before drawing
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          
          // Draw detection box
          const box = detections.detection.box;
          ctx.strokeStyle = '#0066ff';
          ctx.lineWidth = 3;
          ctx.strokeRect(box.x, box.y, box.width, box.height);

          // Update emotion
          const emotions = detections.expressions;
          const dominantEmotion = Object.entries(emotions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0];
          onEmotionDetected(dominantEmotion);
        }
      } catch (err) {
        console.error("Error in emotion detection:", err);
      }

      animationFrame = requestAnimationFrame(detectEmotions);
    };

    const handleVideoPlay = () => {
      detectEmotions();
    };

    video.addEventListener("play", handleVideoPlay);
    if (!video.paused) {
      handleVideoPlay();
    }

    return () => {
      video.removeEventListener("play", handleVideoPlay);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [videoRef, onEmotionDetected]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
}
