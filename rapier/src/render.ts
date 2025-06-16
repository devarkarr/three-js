import App from "./app";
import * as THREE from "three";
import Camera from "./camera";
import { StoreApi } from "zustand";
import { sizeStore } from "./size-store";

class Render {
  app!: App;
  canvas!: HTMLElement;
  instance!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: Camera;
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
    this.scene = this.app.scene;
    this.camera = this.app.camera;
    this.sizeStore = sizeStore;
    this.sizes = this.sizeStore.getState();
    this.setInstance();
    this.setResizeListener();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({ antialias: true });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.canvas.appendChild(this.instance.domElement);
  }

  setResizeListener() {
    this.sizeStore.subscribe((sizes) => {
      this.instance.setSize(sizes.width, sizes.height);
      this.instance.setPixelRatio(sizes.pixelRatio);
    });
  }

  loop() {
    this.instance.render(this.scene, this.camera.instance);
  }
}

export default Render;
