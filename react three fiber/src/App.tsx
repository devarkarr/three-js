// App.tsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function App() {
  return (
    <Canvas
      camera={{ position: [2, 2, 3] }}
      shadows
      style={{ height: "100dvh", width: "100%" }}
    >
      <Suspense fallback={null}>
        <mesh position={[0, 1, -2]} rotation={[1, 2, 5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
        <axesHelper args={[5]} />

        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
