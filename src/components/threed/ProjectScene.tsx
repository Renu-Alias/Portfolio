import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';

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
      <torusKnotGeometry args={[1, 0.3, 64, 8]} />
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
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial color="#E63946" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

const shapes = [TorusKnot, Octahedron, SphereWireframe];

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
