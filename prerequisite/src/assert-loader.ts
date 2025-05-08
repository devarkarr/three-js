import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { assertStore } from "./assert-store";
import App from "./app";

class AssertLoader {
  textureLoader!: THREE.TextureLoader;
  gltfLoader!: GLTFLoader;
  app!: App;
  assertToStore!: {
    id: string;
    type: string;
    path: string;
  }[];
  setAssertToLoad!: (assert: GLTF, id: string) => void;
  constructor() {
    this.app = new App();
    this.assertToStore = assertStore.getState().assertToStore;
    this.setAssertToLoad = assertStore.getState().setAssertToStore;
    this.setAssertLoader();
    this.startLoad();
  }

  setAssertLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setPath("/draco/");
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new THREE.TextureLoader();
  }

  startLoad() {
    this.assertToStore.forEach((assert) => {
      if (assert.type === "gltf") {
        this.gltfLoader.load(assert.path, (gltf) => {
          this.setAssertToLoad(gltf, assert.id);
          const modelGltf = gltf.scene;
          // @ts-ignore
          const material = modelGltf.children[0]?.material;
          material.envMapIntensity = 2;
          modelGltf.scale.setScalar(50);
          this.app.scene.add(modelGltf);
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          this.app.scene.add(ambientLight);
          const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
          DirectionalLight.position.set(2, 2, 2);
          this.app.scene.add(DirectionalLight);
        });
      }
    });
  }
}

export default AssertLoader;
