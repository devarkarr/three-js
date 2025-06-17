// App.tsx
import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { button, useControls } from "leva";
import Lights from "./Lights";

export default function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [-5, 2, -1] }}
        style={{ height: "100dvh", width: "100%" }}
      >
        <Suspense fallback={null}>
          <mesh castShadow>
            <sphereGeometry args={[0.6, 64, 32, 6, 7, 6, 6]} />
            <meshStandardMaterial color={"white"} />
          </mesh>

          <Lights />
          <ContactShadows
            position-y={-1.5}
            opacity={0.4}
            blur={2}
            color={"pink"}
            scale={20}
          />

          <Environment preset="city" />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
}
