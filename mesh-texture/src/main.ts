import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initial scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f0f0f0");

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

const boxGeometry = new THREE.SphereGeometry(10.034, 64, 31);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const geometry = new THREE.CapsuleGeometry(8.6, 1, 4, 8);
// const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// custom geometry
// const vertices = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

// setup tweakpane
const pane = new Pane();

// const material = new THREE.MeshLambertMaterial({
//   color: new THREE.Color("#00FF00").convertSRGBToLinear(), // Green
//   emissive: new THREE.Color("#FF0000").convertSRGBToLinear(), // Red
//   wireframe: true,
// });

// initial loader
const textureLoader = new THREE.TextureLoader();

// initialize texture
const texture = textureLoader.load("/oily-tubework-bl/oily-tubework_ao.png");
texture.repeat.set(10, 10);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.offset.x = 10;
// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.MirroredRepeatWrapping;

const material = new THREE.MeshPhysicalMaterial();
// material.map = texture;
// material.color = new THREE.Color("#f60410");
// material.emissive = new THREE.Color("#000000");
pane.addBinding(texture, "offset", {
  x: {
    min: -1,
    max: 1,
    step: 0.001,
  },
  y: {
    min: -1,
    max: 1,
    step: 0.001,
  },
});
// pane.addBinding(material, "roughness", {
//   min: 0,
//   max: 1,
//   step: 0.1,
// });
// pane.addBinding(material, "metalness", {
//   min: 0,
//   max: 1,
//   step: 0.1,
// });
// pane.addBinding(material, "clearcoat", {
//   min: 0,
//   max: 1,
//   step: 0.1,
// });
// pane.addBinding(material, "reflectivity", {
//   min: 0,
//   max: 1,
//   step: 0.1,
// });

// material.transparent = true;
// material.opacity = 0.5;
// material.side = THREE.FrontSide;

const plane2 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshPhysicalMaterial({ map: texture })
);
const cube = new THREE.Mesh(geometry, material);
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
const cube2 = new THREE.Mesh(geometry, material);
const plane = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16),
  material
);
cube2.position.x = -2;
plane.position.x = 2;
// plane2.position.y = -2;
plane2.rotation.x = -Math.PI * 0.55;
cube.position.y = 2;
// cube.scale.setScalar(2);
// scene.background = new THREE.Color(0xffffff);
// fog
// scene.fog = new THREE.Fog(0xffffff, 1, 10);
scene.add(cube);
scene.add(cube2);
scene.add(plane);
// scene.add(box);
scene.add(plane2);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 7);
pointLight.position.set(0.1, 0, 0);
scene.add(pointLight);

// camera
const camera = new THREE.PerspectiveCamera(
  1,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;
camera.position.y = 5;

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
  texture.offset.x -= 0.01;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
