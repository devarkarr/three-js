import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { Pane } from "tweakpane";
const scene = new THREE.Scene();
// scene.background = new THREE.Color("black");
const pane = new Pane();

const gravityLoader = new THREE.CubeTextureLoader().setPath(
  "/Standard-Cube-Map (2)/"
);

const gravityTexture = gravityLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
scene.background = gravityTexture;
scene.environment = gravityTexture;

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setPath("/draco/");
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load("/boombox/BoomBox.gltf", (gltf) => {
  const modelGltf = gltf.scene;
  const material = modelGltf.children[0]?.material;
  pane.addBinding(material, "roughness", {
    min: 0,
    max: 1,
    step: 0.1,
  });
  material.envMapIntensity = 2;
  modelGltf.scale.setScalar(50);
  scene.add(modelGltf);
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
DirectionalLight.position.set(2, 2, 2);
scene.add(DirectionalLight);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// shadow
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
