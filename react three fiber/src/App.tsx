// App.tsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import { useControls } from "leva";

export default function App() {
  const centerPostions = useControls("Center Position", {
    centerX: { value: 0, min: -10, max: 10, step: 0.1 },
    centerY: { value: 2, min: -10, max: 10, step: 0.1 },
    centerZ: { value: 0, min: -10, max: 10, step: 0.1 },
  });

  const gridControls = useControls("Grid", {
    sectionColor: "#800080",
    cellColor: "#6f6f6f",
    sectionSize: 3,
    sectionThickness: 1,
    cellSize: 1,
    cellThickness: 0.6,
    infiniteGrid: true,
    fadeDistance: 50,
    fadeStrength: 5,
  });

  return (
    <Canvas shadows style={{ height: "100dvh", width: "100%" }}>
      <PerspectiveCamera position={[1, 2, 5]} makeDefault aspect={1} />

      <Suspense fallback={null}>
        <Center
          top
          left
          position={[
            centerPostions.centerX,
            centerPostions.centerY,
            centerPostions.centerZ,
          ]}
        >
          <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
          <mesh position={[2, 0, 0]}>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </Center>

        <Grid {...gridControls} />

        <axesHelper args={[5]} />
        <OrbitControls />
        <Stats />
      </Suspense>
    </Canvas>
  );
}
