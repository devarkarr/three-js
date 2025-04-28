import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// initial scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#f0f0f0");

// add objects to scene
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// custom geometry
const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("#00FF00").convertSRGBToLinear(), // Green
  emissive: new THREE.Color("#FF0000").convertSRGBToLinear(), // Red
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
cube.scale.setScalar(2);
scene.add(cube);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 5;

// renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
// antialiasing problem solution
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
controls.enableZoom = true;

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// animate
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
