import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Car() {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/low-poly_cartoon_style_car_01/scene.gltf");

  return <primitive object={scene} ref={ref} />;
}
