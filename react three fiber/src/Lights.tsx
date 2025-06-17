import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const dirLight = useRef<THREE.DirectionalLight | null>(null);
  const pointLight = useRef<THREE.PointLight | null>(null);
  const hemiLight = useRef<THREE.HemisphereLight | null>(null);
  const spotLight = useRef<THREE.SpotLight | null>(null);
  useHelper(
    dirLight as React.RefObject<THREE.Object3D>,
    THREE.DirectionalLightHelper,
    1
  );
  useHelper(
    pointLight as React.RefObject<THREE.Object3D>,
    THREE.PointLightHelper,
    1
  );
  useHelper(
    hemiLight as React.RefObject<THREE.Object3D>,
    THREE.HemisphereLightHelper,
    1
  );
  useHelper(
    spotLight as React.RefObject<THREE.Object3D>,
    THREE.SpotLightHelper,
    "red"
  );

  const { camera } = useThree();

  const updateFov = (fov: number) => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  };
  useControls("FOV", {
    smallFov: button(() => updateFov(20)),
    normalFov: button(() => updateFov(40)),
    largeFov: button(() => updateFov(80)),
  });

  return (
    <>
      <ambientLight intensity={0} color={"green"} />
      {/* <directionalLight
        ref={dirLight}
        args={["#F7374F", 1]}
        castShadow
        position={[1, 2, 3]}
      />
      <pointLight
        ref={pointLight}
        position={[7, 2, 0]}
        args={["orange", 3, 0, 0.01]}
      />
      <pointLight
        castShadow
        position={[-7, 2, 0]}
        args={["#0065F8", 1, 0, 0.01]}
      />
      <hemisphereLight
        args={["#FFEB00", "green", 1]}
        ref={hemiLight}
        castShadow
        position={[-3, 2, -3]}
      /> */}
      <spotLight
        args={["#FF6500", 5, 0, 0.5, 1, 0.01]}
        castShadow
        position={[3, 2, 3]}
        shadow-camera-near={3}
        shadow-camera-far={10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
}
