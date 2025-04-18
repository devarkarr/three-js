import "./style.css";
import * as THREE from "three";

// initial scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");

// add objects to scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("#00FF00").convertSRGBToLinear(), // Green
  emissive: new THREE.Color("#FF0000").convertSRGBToLinear(), // Red
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// animate
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
