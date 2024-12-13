"use client";

import { FloatingGem } from '../../floating-gem';

export function SceneGems() {
  return (
    <>
      <FloatingGem position={[-2, 0, 0]} color="#ec4899" />
      <FloatingGem position={[0, 0, 0]} color="#8b5cf6" />
      <FloatingGem position={[2, 0, 0]} color="#06b6d4" />
    </>
  );
}