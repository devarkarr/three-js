import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initial scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#f0f0f0");

// add objects to scene
const boxParameters = {
  width: 1,
  height: 1,
  depth: 1,
};
const geometry = new THREE.BoxGeometry(
  boxParameters.width,
  boxParameters.height,
  boxParameters.depth,
  2,
  2,
  2
);
// const geometry = new THREE.CapsuleGeometry(8.6, 1, 4, 8);
// const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// custom geometry
// const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// setup tweakpane
const pane = new Pane();
const folder = pane.addFolder({
  title: "Title",
  expanded: true,
});

// Helper function to update geometry
const updateCubeGeometry = () => {
  const { width, height, depth } = boxParameters;
  cube.geometry.dispose(); // dispose old geometry (important to avoid memory leaks)
  cube.geometry = new THREE.BoxGeometry(width, height, depth);
};

// Add bindings
["width", "height", "depth"].forEach((dimension) => {
  folder
    .addBinding(boxParameters, dimension as "width" | "height" | "depth", {
      min: 0.1,
      max: 10,
      step: 0.1,
      label: dimension.charAt(0).toUpperCase() + dimension.slice(1),
    })
    .on("change", updateCubeGeometry);
});

const material = new THREE.MeshLambertMaterial({
  color: new THREE.Color("#00FF00").convertSRGBToLinear(), // Green
  emissive: new THREE.Color("#FF0000").convertSRGBToLinear(), // Red
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
// cube.scale.setScalar(2);
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
renderer.setSize(window.innerWidth, window.innerHeight);
// antialiasing problem solution
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
