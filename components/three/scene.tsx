"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloatingGem } from './floating-gem';

export function Scene() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <FloatingGem position={[-2, 0, 0]} color="#ec4899" />
      <FloatingGem position={[0, 0, 0]} color="#8b5cf6" />
      <FloatingGem position={[2, 0, 0]} color="#06b6d4" />
    </Canvas>
  );
}