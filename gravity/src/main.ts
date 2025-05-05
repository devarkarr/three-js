import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

interface Plant {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  material: THREE.MeshStandardMaterial;
  moons:
    | {
        name: string;
        radius: number;
        distance: number;
        speed: number;
      }[]
    | [];
}
const scene = new THREE.Scene();
// scene.background = new THREE.Color("black");
// const pane = new Pane();

const textureLoader = new THREE.TextureLoader();
const gravityLoader = new THREE.CubeTextureLoader().setPath(
  "/Standard-Cube-Map/"
);
const sunTexture = textureLoader.load("2k_sun.jpg");
const earthTexture = textureLoader.load("/2k_earth_daymap.jpg");
const moonTexture = textureLoader.load("/2k_moon.jpg");
const venusTexture = textureLoader.load("/2k_venus_surface.jpg");
const marsTexture = textureLoader.load("/2k_mars.jpg");
const jupiterTexture = textureLoader.load("/2k_jupiter.jpg");

const gravityTexture = gravityLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
console.log(gravityLoader);
scene.background = gravityTexture;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  map: sunTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

const plants = [
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [],
  },
  {
    name: "Jupiter",
    radius: 0.8,
    distance: 14,
    speed: 0.005,
    material: jupiterMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
];

const createPlant = (plant: Plant) => {
  const mesh = new THREE.Mesh(sphereGeometry, plant.material);
  mesh.scale.setScalar(plant.radius);
  mesh.position.x = plant.distance;
  scene.add(mesh);
  return mesh;
};

const createMoon = (moon: {
  name: string;
  radius: number;
  distance: number;
  speed: number;
}) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.position.x = moon.distance;
  moonMesh.scale.setScalar(moon.radius);
  return moonMesh;
};

const plantMeshes = plants.map((plant) => {
  const newPlant = createPlant(plant);
  plant.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    newPlant.add(moonMesh);
  });
  return newPlant;
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 0);
pointLight.position.set(0, 0, 0);

const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
camera.position.y = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// shadow
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

pointLight.castShadow = true;
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
  plantMeshes.forEach((plant, index) => {
    plant.rotation.y += plants[index].speed;
    plant.position.x = Math.sin(plant.rotation.y) * plants[index].distance;
    plant.position.z = Math.cos(plant.rotation.y) * plants[index].distance;
    plant.children.forEach((moon, moonIndex) => {
      moon.rotation.y += plants[index].moons[moonIndex].speed;
      moon.position.x =
        Math.sin(moon.rotation.y) * plants[index].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) * plants[index].moons[moonIndex].distance;
    });
  });
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
