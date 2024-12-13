"use client";

import { Canvas } from "@react-three/fiber";
import { SceneGems } from "./gems";
import { OrbitControls } from "@react-three/drei";

export function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />
      <SceneGems />
    </Canvas>
  );
}