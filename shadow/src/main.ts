import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import { Pane } from "tweakpane";

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");
const pane = new Pane();

const circleGeometry = new THREE.CircleGeometry(5, 32);
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const torusGeometry = new THREE.TorusKnotGeometry(0.4, 0.15, 300, 20);
// const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
// sphereGeometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2)
// );

const group = new THREE.Group();

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.1,
});
pane.addFolder({ title: "Material" });
pane.addBinding(material, "color", {
  color: { type: "float" },
});
pane.addBinding(material, "metalness", {
  min: 0,
  max: 1,
  step: 0.1,
});
pane.addBinding(material, "roughness", {
  min: 0,
  max: 1,
  step: 0.1,
});
const receiveBg = new THREE.Mesh(circleGeometry, material);
receiveBg.rotation.x = -Math.PI / 2;
receiveBg.position.y = -1;
receiveBg.receiveShadow = true;
// receiveBg.scale.setScalar(2);

const mesh1 = new THREE.Mesh(boxGeometry, material);
const mesh2 = new THREE.Mesh(boxGeometry, material);
const mesh3 = new THREE.Mesh(sphereGeometry, material);
const mesh4 = new THREE.Mesh(sphereGeometry, material);
const mesh5 = new THREE.Mesh(torusGeometry, material);
const mesh6 = new THREE.Mesh(torusGeometry, material);
mesh1.position.z = 1.5;
mesh1.castShadow = true;
mesh3.position.x = 1.5;
mesh2.castShadow = true;
mesh3.castShadow = true;
mesh4.position.x = 1.5;
mesh4.castShadow = true;
mesh4.position.z = 1.5;
// mesh5.position.z = -1.5;
mesh5.position.x = -1.5;
mesh5.castShadow = true;

mesh6.position.x = -1.5;
mesh6.position.z = 1.5;
mesh6.castShadow = true;

// const mesh1 = new THREE.Mesh(sphereGeometry, oilMaterial);
// const mesh2 = new THREE.Mesh(sphereGeometry, harshMaterial);
// mesh2.position.x = 2;

// const mesh3 = new THREE.Mesh(sphereGeometry, vinesMaterial);
// mesh3.position.x = -2;

// group.add(mesh1, mesh2, mesh3);
group.add(mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, receiveBg);
scene.add(group);

const ambientLight = new THREE.AmbientLight();
ambientLight.position.y = 2;
pane.addFolder({ title: "Ambient Light" });
pane.addBinding(ambientLight, "color", {
  color: { type: "float" },
});
pane.addBinding(ambientLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight("red", "blue", 0);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.5
// );
hemisphereLight.position.y = 2;
pane.addFolder({ title: "Hemisphere Light" });
pane.addBinding(hemisphereLight, "color", {
  color: { type: "float" },
});
pane.addBinding(hemisphereLight, "groundColor", {
  color: { type: "float" },
});
pane.addBinding(hemisphereLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});
// hemisphereLight.add(hemisphereLightHelper);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight("white", 0.5);
directionalLight.position.set(3, 10, 15);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.radius = 5;

// directionalLight.shadow.camera.near = 1;
// directionalLight.shadow.camera.far = 10;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(directionalLightCameraHelper);
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);
scene.add(directionalLight);
pane.addFolder({
  title: "Directional Light",
});
pane.addBinding(directionalLight, "color", {
  color: { type: "float" },
});
pane.addBinding(directionalLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

const pointLight = new THREE.PointLight("white", 0, 0, 0.01);
pointLight.position.set(-3, 2, -3);
// const pointHelper = new THREE.PointLightHelper(pointLight, 0.5);
// scene.add(pointHelper);
scene.add(pointLight);
pane.addFolder({
  title: "Point Light",
});
pane.addBinding(pointLight, "color", {
  color: { type: "float" },
});
pane.addBinding(pointLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.01,
});

const spotLight = new THREE.SpotLight("white", 0);
spotLight.position.set(2, 2, 2);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.radius = 10;

spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 100;
spotLight.shadow.camera.fov = 30;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
scene.add(spotLight);
pane.addFolder({
  title: "Spot Light",
});
pane.addBinding(spotLight, "angle", {
  min: 0,
  max: Math.PI / 2,
  step: 0.01,
});
pane.addBinding(spotLight, "penumbra", {
  min: 0,
  max: 1,
  step: 0.01,
});
pane.addBinding(spotLight, "decay", {
  min: 0,
  max: 1,
  step: 0.01,
});
pane.addBinding(spotLight, "distance", {
  min: 0,
  max: 10,
  step: 0.01,
});
pane.addBinding(spotLight, "color", {
  color: { type: "float" },
});
pane.addBinding(spotLight, "intensity", {
  min: 0,
  max: 1,
  step: 0.1,
});

const rectLight = new THREE.RectAreaLight("white", 0, 50, 2);
rectLight.position.y = 6;
rectLight.position.z = 6;

// const rectLightHelper = new RectAreaLightHelper(rectLight, 0.5);
// scene.add(rectLightHelper);
scene.add(rectLight);
pane.addFolder({
  title: "Rect Area Light",
});
pane.addBinding(rectLight, "color", {
  color: { type: "float" },
});
pane.addBinding(rectLight, "intensity", {
  min: 0,
  max: 10,
  step: 0.01,
});

// scene.add(new THREE.AmbientLight(0xffffff, 0.4));
// const pointLight = new THREE.PointLight(0xffffff, 100);
// pointLight.position.set(4, 4, 2);
// scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type =  THREE.PCFSoftShadowMap	
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
