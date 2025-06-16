import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const lightRef = useRef<THREE.PointLight>(null);

  // Must be inside a Canvas-rendered component
  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 2, 0]}
        // angle={0.4}
        // penumbra={0.5}
        color="white"
        intensity={1}
        // distance={10}
        decay={0.01}
        castShadow
      />
      <spotLight
        position={[3, 2, -3]}
        angle={0.4}
        penumbra={0.5}
        color="#a400ea"
        intensity={1}
        // distance={10}
        decay={0.01}
        castShadow
      />
    </>
  );
}
