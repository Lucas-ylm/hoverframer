import React, { useRef, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  useGLTF,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import { easing } from 'maath';
import { useStore } from './store.ts';

// Type for the Selector component props
interface SelectorProps {
  children: ReactNode; // Accepts any valid React children
}

// Type for the Shoe component props
interface ShoeProps {
  rotation: [number, number, number]; // Array of 3 numbers for rotation
}

// Main Scene Component
function MainScene() {
  const rootElement = document.getElementById('root') || undefined;

  return (
    <Canvas
      eventSource={rootElement} // Safe fallback to undefined
      eventPrefix="client"
      camera={{ position: [0, 0, 4], fov: 40 }}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={0.5}
        angle={0.1}
        penumbra={1}
        position={[10, 15, -5]}
        castShadow
      />
      <Environment preset="city" background blur={1} />
      <ContactShadows
        resolution={512}
        position={[0, -0.8, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />
      <Selector>
        <Shoe rotation={[0.3, Math.PI / 1.6, 0]} />
      </Selector>
    </Canvas>
  );
}


// Selector Component
import { store } from './store.ts'; // Import the store directly

function Selector({ children }: SelectorProps) {
  const ref = useRef<THREE.Mesh>(null); // Type for a THREE.Mesh reference
  const state = useStore(); // Read the snapshot for rendering purposes

  useFrame(({ viewport, camera, pointer }, delta) => {
    if (!ref.current) return;
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
    easing.damp3(
      ref.current.position,
      [(pointer.x * width) / 2, (pointer.y * height) / 2, 3],
      state.open ? 0 : 0.1,
      delta
    );
    easing.damp3(
      ref.current.scale,
      state.open ? 4 : 0.01,
      state.open ? 0.5 : 0.2,
      delta
    );
    easing.dampC(
      (ref.current.material as THREE.MeshStandardMaterial).color,
      state.open ? '#f0f0f0' : '#ccc',
      0.1,
      delta
    );
  });

  return (
    <>
      <mesh ref={ref}>
        <circleGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          samples={16}
          resolution={512}
          anisotropicBlur={0.1}
          thickness={0.1}
          roughness={0.4}
          toneMapped={true}
        />
      </mesh>
      <group
        onPointerOver={() => (store.open = true)} // Update the proxy store directly
        onPointerOut={() => (store.open = false)} // Update the proxy store directly
        onPointerDown={() => (store.open = true)}
        onPointerUp={() => (store.open = false)}
      >
        {children}
      </group>
    </>
  );
}


// Shoe Component
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, BufferGeometry, Material } from 'three';

interface GLTFResult extends GLTF {
  nodes: {
    defaultMaterial: Mesh<BufferGeometry, Material>;
  };
  materials: {
    NikeShoe: Material;
  };
}

function Shoe({ rotation }: ShoeProps) {
  const ref = useRef<THREE.Group>(null); // Type for a THREE.Group reference
  
  // Use as unknown to explicitly cast the result to GLTFResult
  const { nodes, materials } = useGLTF(
    '/nike_air_zoom_pegasus_36-transformed.glb'
  ) as unknown as GLTFResult;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 3) / 4,
      0.15 + Math.sin(t / 2) / 8
    );
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
  });

  return (
    <group ref={ref}>
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.NikeShoe}
        rotation={rotation}
      />
    </group>
  );
}


useGLTF.preload('/nike_air_zoom_pegasus_36-transformed.glb');

export default MainScene;
