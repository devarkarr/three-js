import * as THREE from "three";
import App from "./app";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { StoreApi } from "zustand";
import { sizeStore } from "./size-store";

class Camera {
  app!: App;
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  canvas!: HTMLElement;
  sizeStore!: StoreApi<{
    width: number;
    height: number;
    pixelRatio: number;
  }>;
  sizes!: {
    width: number;
    height: number;
    pixelRatio: number;
  };

  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.sizeStore = sizeStore;
    this.sizes = this.sizeStore.getState();
    this.setInitialize();
    this.setControls();
    this.setResizeListener();
  }

  setInitialize() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.z = 20;
    this.instance.position.x = 20;
    this.instance.position.y = 20;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  setResizeListener() {
    this.sizeStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  loop() {
    this.controls.update();
  }
}

export default Camera;
