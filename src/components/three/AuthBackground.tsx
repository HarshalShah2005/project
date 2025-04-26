import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

const FluidWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.distort = 0.4 + 0.1 * Math.sin(clock.getElapsedTime() * 0.3);
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[4, 4, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial
        color="#4F46E5"
        speed={1.5}
        distort={0.4}
        radius={1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const GradientBackground = () => {
  return (
    <mesh position={[0, 0, -1]} scale={[6, 6, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#e0e7ff" />
    </mesh>
  );
};

const AuthBackground = () => {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 2] }} dpr={[1, 1.5]}>
        <GradientBackground />
        <FluidWave />
      </Canvas>
    </div>
  );
};

export default AuthBackground;