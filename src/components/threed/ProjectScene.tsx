import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

interface ProjectSceneProps {
  index: number;
  className?: string;
}

function TorusKnot() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.2;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 32, 8]} />
      <meshBasicMaterial color="#E63946" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function Octahedron() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.15;
    ref.current.rotation.z = clock.getElapsedTime() * 0.25;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshBasicMaterial color="#E63946" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

function SphereWireframe() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
    ref.current.rotation.x = clock.getElapsedTime() * 0.05;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#E63946" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function HeavyCage() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.06;
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.5, 1.5, 1.5, 3, 3, 3]} />
      <meshBasicMaterial color="#E63946" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function HeavyTorus() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.08;
    ref.current.rotation.y = clock.getElapsedTime() * 0.12;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.8, 0.35, 12, 16]} />
      <meshBasicMaterial color="#E63946" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

const shapes = [TorusKnot, Octahedron, SphereWireframe, HeavyCage, HeavyTorus];

const ProjectScene = ({ index = 0 }: ProjectSceneProps) => {
  const Shape = shapes[index % shapes.length];
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Shape />
    </Canvas>
  );
};

export default ProjectScene;
