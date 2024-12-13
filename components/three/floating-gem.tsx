"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface FloatingGemProps {
  position: [number, number, number];
  color: string;
}

export function FloatingGem({ position, color }: FloatingGemProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Rotation animation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.6]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
