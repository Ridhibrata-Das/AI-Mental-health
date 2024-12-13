"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

export function FloatingGem({ position = [0, 0, 0], color = '#8b5cf6' }) {
  const meshRef = useRef();
  
  const { scale } = useSpring({
    from: { scale: [1, 1, 1] },
    to: { scale: [1.2, 1.2, 1.2] },
    config: { mass: 1, tension: 170, friction: 26 },
    loop: { reverse: true },
  });

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <animated.mesh ref={meshRef} position={position} scale={scale}>
      <Icosahedron args={[1, 0]}>
        <meshPhongMaterial
          color={color}
          shininess={100}
          specular="#ffffff"
        />
      </Icosahedron>
    </animated.mesh>
  );
}