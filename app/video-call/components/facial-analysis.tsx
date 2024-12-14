"use client";

import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

interface FacialAnalysisProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onEmotionDetected?: (emotion: string) => void;
}

const emotionMap: { [key: string]: string } = {
  angry: "Angry",
  disgusted: "Disgusted",
  fearful: "Fearful",
  happy: "Happy",
  neutral: "Neutral",
  sad: "Sad",
  surprised: "Surprised"
};

export function FacialAnalysis({ videoRef, onEmotionDetected }: FacialAnalysisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentEmotion, setCurrentEmotion] = useState<string>("");
  const [confidenceScore, setConfidenceScore] = useState<number>(0);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);
        console.log('Models loaded successfully');
      } catch (err) {
        console.error('Error loading models:', err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let isProcessing = false;

    const detectEmotions = async () => {
      if (!video || !canvas || isProcessing || !video.srcObject) return;

      isProcessing = true;
      try {
        const detections = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections) {
          const expressions = detections.expressions;
          const dominantEmotion = Object.entries(expressions).reduce((a, b) => 
            a[1] > b[1] ? a : b
          );

          const emotion = emotionMap[dominantEmotion[0]] || dominantEmotion[0];
          const confidence = Math.round(dominantEmotion[1] * 100);

          if (confidence > 50) {
            setCurrentEmotion(emotion);
            setConfidenceScore(confidence);
            if (onEmotionDetected) {
              onEmotionDetected(emotion);
            }
          }
        }
      } catch (err) {
        console.error('Error in emotion detection:', err);
      }
      isProcessing = false;
      animationFrameId = requestAnimationFrame(detectEmotions);
    };

    video.addEventListener('play', () => {
      console.log('Video playing - starting emotion detection');
      detectEmotions();
    });

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [videoRef, onEmotionDetected]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" style={{ display: 'none' }} />
      {currentEmotion && confidenceScore > 50 && (
        <div 
          className="absolute top-4 left-4 bg-blue-500/80 text-white px-3 py-2 rounded-md shadow-lg backdrop-blur-sm"
          style={{ zIndex: 10 }}
        >
          <p className="text-sm font-medium">
            {currentEmotion} ({confidenceScore}%)
          </p>
        </div>
      )}
    </>
  );
}
