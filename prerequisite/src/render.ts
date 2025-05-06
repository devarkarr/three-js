import * as THREE from "three";
import App from "./app";
import Camera from "./camera";

class Render {
  app!: App;
  canvas!: HTMLElement;
  instance!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: Camera;

  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.scene = this.app.scene;
    this.camera = this.app.camera;
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({ antialias: true });
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.canvas.appendChild(this.instance.domElement);
  }

  loop() {
    this.instance.render(this.scene, this.camera.instance);
  }
}

export default Render;
