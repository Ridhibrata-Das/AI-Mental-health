"use client";

import { Canvas } from '@react-three/fiber';
import { SceneCamera } from './camera';
import { SceneLights } from './lights';
import { SceneGems } from './gems';

export function Scene() {
  return (
    <Canvas className="w-full h-full">
      <SceneCamera />
      <SceneLights />
      <SceneGems />
    </Canvas>
  );
}