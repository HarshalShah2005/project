import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, MeshDistortMaterial } from '@react-three/drei';
import { Vector2 } from 'three';

const FluidSurface = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useRef(new Vector2(0, 0));
  const { viewport } = useThree();
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.distort = 0.3 + 0.1 * Math.sin(clock.getElapsedTime() * 0.5);
      
      // Subtle movement towards mouse position
      const mesh = meshRef.current;
      mesh.rotation.x = mousePosition.current.y * 0.05;
      mesh.rotation.y = mousePosition.current.x * 0.05;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[viewport.width * 1.5, viewport.height * 1.5, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial
        color="#4F46E5"
        speed={2}
        distort={0.3}
        radius={1}
        transparent
        opacity={0.1}
      />
    </mesh>
  );
};

const BackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 1.5]}>
        <FluidSurface />
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;