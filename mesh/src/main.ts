import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// initial scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#f0f0f0");

// add objects to scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("#00FF00").convertSRGBToLinear(), // Green
  emissive: new THREE.Color("#FF0000").convertSRGBToLinear(), // Red
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.scale.setScalar(1.1);
// rotation
cube.rotation.x = THREE.MathUtils.degToRad(45);
// vector
const tempVector = new THREE.Vector3(0, 1, -3);
cube.position.copy(tempVector);

const cube2 = new THREE.Mesh(geometry, material);
cube2.castShadow = true;
cube2.scale.setScalar(0.8);

const cube3 = new THREE.Mesh(geometry, material);
cube3.castShadow = true;
cube3.scale.setScalar(1.1);
cube3.position.x = 3;
cube3.position.y = 1;

// group
const group = new THREE.Group();
group.add(cube);
group.add(cube2);
group.add(cube3);
group.position.set(0, 1, 0);
scene.add(group);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "white" })
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// axes helpers
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;

scene.add(directionalLight);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

console.log(tempVector.distanceTo(camera.position));

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

// initialize clock
const clock = new THREE.Clock();
let previousTime = 0;

// animate
function animate() {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  cube2.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
  cube2.scale.x += Math.sin(currentTime) * 20 + 2;
  cube2.position.x = Math.sin(currentTime) + 2;
  // cube3.rotation.x += 0.01;
  // cube3.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
