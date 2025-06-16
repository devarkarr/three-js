// App.tsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "./Ground";
import Car from "./Car";
import Lights from "./Lights";

export default function App() {
  return (
    <Canvas
      camera={{ position: [2, 2, 4], fov: 50 }}
      shadows
      style={{ height: "100dvh", width: "100%", backgroundColor: "black" }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <ambientLight intensity={0.3} />
        <Lights />
        <Car />
        <Ground />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
