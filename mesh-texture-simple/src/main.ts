import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Pane } from "tweakpane";

const scene = new THREE.Scene();
const pane = new Pane();
const textureLoader = new THREE.TextureLoader();

function setTextureRepeatWrap(
  texture: THREE.Texture,
  repeatX: number = 8,
  repeatY: number = 8
) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
}

function createPBRMaterial(
  textures: Record<string, THREE.Texture>,
  name: string,
  displacementScale = 0.01,
  roughness = 0.0
) {
  Object.values(textures).forEach((tex) => setTextureRepeatWrap(tex));

  const material = new THREE.MeshPhysicalMaterial({
    map: textures.albedo,
    roughnessMap: textures.roughness,
    roughness,
    metalnessMap: textures.metalness,
    metalness: 1,
    normalMap: textures.normal,
    displacementMap: textures.height,
    displacementScale,
    aoMap: textures.ao,
    aoMapIntensity: 1,
    clearcoat: 1,
  });

  const folder = pane.addFolder({ title: name });
  folder.addBinding(material, "roughness", { min: 0, max: 1, step: 0.1 });
  folder.addBinding(material, "metalness", { min: 0, max: 1, step: 0.1 });
  folder.addBinding(material, "clearcoat", { min: 0, max: 1, step: 0.1 });
  folder.addBinding(material, "reflectivity", { min: 0, max: 1, step: 0.1 });

  return material;
}

const oilTextures = {
  albedo: textureLoader.load("/oily-tubework-bl/oily-tubework_albedo.png"),
  roughness: textureLoader.load(
    "/oily-tubework-bl/oily-tubework_roughness.png"
  ),
  normal: textureLoader.load("/oily-tubework-bl/oily-tubework_normal-ogl.png"),
  metalness: textureLoader.load("/oily-tubework-bl/oily-tubework_metallic.png"),
  height: textureLoader.load("/oily-tubework-bl/oily-tubework_height.png"),
  ao: textureLoader.load("/oily-tubework-bl/oily-tubework_ao.png"),
};

const harshTextures = {
  albedo: textureLoader.load("/harshbricks-bl/harshbricks-albedo.png"),
  roughness: textureLoader.load("/harshbricks-bl/harshbricks-roughness.png"),
  normal: textureLoader.load("/harshbricks-bl/harshbricks-normal.png"),
  metalness: textureLoader.load("/harshbricks-bl/harshbricks-metalness.png"),
  height: textureLoader.load("/harshbricks-bl/harshbricks-height5-16.png"),
  ao: textureLoader.load("/harshbricks-bl/harshbricks-ao2.png"),
};

const vinesTextures = {
  albedo: textureLoader.load("/vines-bl/vines_albedo.png"),
  roughness: textureLoader.load("/vines-bl/vines_roughness.png"),
  normal: textureLoader.load("/vines-bl/vines_normal-ogl.png"),
  metalness: textureLoader.load("/vines-bl/vines_metallic.png"),
  height: textureLoader.load("/vines-bl/vines_height.png"),
  ao: textureLoader.load("/vines-bl/vines_ao.png"),
};

const oilMaterial = createPBRMaterial(oilTextures, "Oil Material", 0.01, 0.1);
const harshMaterial = createPBRMaterial(
  harshTextures,
  "Harsh Material",
  0.001,
  0.1
);
const vinesMaterial = createPBRMaterial(
  vinesTextures,
  "Vines Material",
  0.05,
  0.1
);

const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
sphereGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2)
);

const group = new THREE.Group();

const mesh1 = new THREE.Mesh(sphereGeometry, oilMaterial);
const mesh2 = new THREE.Mesh(sphereGeometry, harshMaterial);
mesh2.position.x = 2;

const mesh3 = new THREE.Mesh(sphereGeometry, vinesMaterial);
mesh3.position.x = -2;

group.add(mesh1, mesh2, mesh3);
scene.add(group);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(4, 4, 2);
scene.add(pointLight);

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
