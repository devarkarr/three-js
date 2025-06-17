// App.tsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./Lights";

export default function App() {
  return (
    <Canvas
      shadows
      style={{ height: "100dvh", width: "100%", backgroundColor: "black" }}
    >
      <PerspectiveCamera position={[-5, 2, -1]} makeDefault fov={70} />

      <Suspense fallback={null}>
        <mesh castShadow>
          <sphereGeometry args={[0.6, 64, 32, 6, 7, 6, 6]} />
          <meshPhongMaterial
            color="purple"
            shininess={150}
            specular="#d24b4b"
            emissive="#4300FF"
          />
        </mesh>
        <mesh
          receiveShadow
          position={[0, -0.6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial
            color="white"
            metalness={0.5}
            roughness={0}
            emissive="#439362"
            flatShading={true}
          />
        </mesh>
        <Lights />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
