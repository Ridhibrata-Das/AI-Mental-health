"use client";

import { PerspectiveCamera, OrbitControls } from '@react-three/drei';

export function SceneCamera() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} />
    </>
  );
}