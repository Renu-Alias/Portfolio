import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import type { Mesh, Group } from 'three';
import * as THREE from 'three';

function WireframeRing({ color = '#E63946', ...props }: { color?: string; position?: [number, number, number]; scale?: number; rotSpeed?: number }) {
  const ref = useRef<Mesh>(null);
  const speed = useMemo(() => props.rotSpeed ?? (0.08 + Math.random() * 0.06), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.5;
    ref.current.rotation.y = t * speed;
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <mesh ref={ref} position={props.position} scale={props.scale ?? 1}>
      <torusGeometry args={[0.8, 0.15, 24, 48]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function ParticleField({ count = 2000 }) {
  const ref = useRef<Group>(null);
  const [positions, speeds, offsets, origPos] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 15;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 5;
      spd[i] = 0.1 + Math.random() * 0.2;
      off[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, off, pos.slice()];
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const geo = (ref.current.children[0] as THREE.Points).geometry;
    const pos = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const wave = Math.sin(t * speeds[i] + offsets[i]) * 0.8;
      pos[i3 + 1] = origPos[i3 + 1] + wave;
      pos[i3] = origPos[i3] + Math.sin(t * speeds[i] * 0.5 + offsets[i]) * 0.4;
      pos[i3 + 2] = origPos[i3 + 2] + Math.cos(t * speeds[i] * 0.4 + offsets[i]) * 0.4;
    }
    geo.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.008;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#F5F5F5" transparent opacity={0.25} sizeAttenuation />
      </points>
    </group>
  );
}

function RedParticles({ count = 300 }) {
  const ref = useRef<Group>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 8;
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6 - 1;
      pos[i * 3 + 2] = r * Math.sin(theta) - 3;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#E63946" transparent opacity={0.2} sizeAttenuation />
      </points>
    </group>
  );
}

function AtmosphereGlow() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.04 + Math.sin(clock.getElapsedTime() * 0.3) * 0.015;
  });

  return (
    <mesh ref={ref} position={[0, -3, -4]} scale={[8, 3, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#E63946" transparent opacity={0.04} />
    </mesh>
  );
}

function FloatingDots() {
  const count = 60;
  const ref = useRef<Group>(null);
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
      spd[i] = 0.2 + Math.random() * 0.3;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { pos, spd, off };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const mesh = ref.current.children[i] as THREE.Mesh;
      mesh.position.y = data.pos[i3 + 1] + Math.sin(t * data.spd[i] + data.off[i]) * 0.5;
    }
  });

  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[data.pos[i * 3], data.pos[i * 3 + 1], data.pos[i * 3 + 2]]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={i % 5 === 0 ? '#E63946' : '#F5F5F5'} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0.5, 9], fov: 55 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
  >
    <ParticleField count={2000} />
    <RedParticles count={400} />
    <FloatingDots />
    <WireframeRing position={[-4, 1.5, -2]} scale={1.2} />
    <WireframeRing position={[4, -1, -2.5]} scale={1} />
    <WireframeRing position={[0, 3, -4]} scale={1.5} rotSpeed={0.05} />
    <WireframeRing position={[-3, -2.5, -3.5]} scale={0.8} color="#F5F5F5" />
    <WireframeRing position={[3.5, 2, -4]} scale={1.1} />
    <AtmosphereGlow />
  </Canvas>
);

export default HeroScene;
