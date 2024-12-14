"use client";

import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

interface FacialAnalysisProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onEmotionDetected: (emotion: string) => void;
}

export function FacialAnalysis({ videoRef, onEmotionDetected }: FacialAnalysisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isModelsLoaded = useRef(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        if (!isModelsLoaded.current) {
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          ]);
          isModelsLoaded.current = true;
          console.log("Face detection models loaded successfully");
        }
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !isModelsLoaded.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    let animationFrame: number;

    const updateCanvasDimensions = () => {
      if (!video || !canvas) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    const drawEmotionBox = (ctx: CanvasRenderingContext2D, emotion: string, confidence: number) => {
      // Draw blue box in top-left corner
      const boxWidth = 150;
      const boxHeight = 60;
      const padding = 10;
      
      // Draw box
      ctx.strokeStyle = '#0000FF';
      ctx.lineWidth = 2;
      ctx.strokeRect(padding, padding, boxWidth, boxHeight);
      
      // Fill with semi-transparent background
      ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
      ctx.fillRect(padding, padding, boxWidth, boxHeight);
      
      // Draw text
      ctx.fillStyle = '#0000FF';
      ctx.font = '16px Arial';
      ctx.fillText(`Emotion: ${emotion}`, padding + 10, padding + 25);
      ctx.fillText(`Confidence: ${(confidence * 100).toFixed(0)}%`, padding + 10, padding + 45);
    };

    const detectEmotions = async () => {
      if (!video || !canvas || video.paused || video.ended) return;

      try {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          updateCanvasDimensions();

          const detections = await faceapi
            .detectSingleFace(
              video,
              new faceapi.TinyFaceDetectorOptions({ inputSize: 224 })
            )
            .withFaceExpressions();

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Clear previous drawings
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (detections) {
            const emotions = detections.expressions;
            const dominantEmotion = Object.entries(emotions).reduce((a, b) =>
              a[1] > b[1] ? a : b
            );
            
            // Map face-api emotions to more user-friendly terms
            const emotionMapping: { [key: string]: string } = {
              neutral: 'Normal',
              happy: 'Happy',
              sad: 'Depressed',
              angry: 'Anger',
              fearful: 'Fear',
              disgusted: 'Disgusted',
              surprised: 'Excited',
              // Add more mappings as needed
            };

            const displayEmotion = emotionMapping[dominantEmotion[0]] || dominantEmotion[0];
            
            // Only update if confidence is above threshold
            if (dominantEmotion[1] > 0.5) {
              onEmotionDetected(displayEmotion);
              drawEmotionBox(ctx, displayEmotion, dominantEmotion[1]);
            }
          }
        }
      } catch (err) {
        console.error("Error in emotion detection:", err);
      }

      animationFrame = requestAnimationFrame(detectEmotions);
    };

    const handleVideoPlay = () => {
      if (isModelsLoaded.current) {
        detectEmotions();
      }
    };

    video.addEventListener("play", handleVideoPlay);
    
    if (!video.paused && isModelsLoaded.current) {
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
        height: '100%',
        objectFit: 'contain'
      }}
    />
  );
}
