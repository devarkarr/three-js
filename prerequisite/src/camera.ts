import App from "./app";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Camera {
  app!: App;
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  canvas!: HTMLElement;

  constructor() {
    this.app = new App();
    this.canvas = this.app.canvas;
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.instance.position.z = 5;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  loop() {
    this.controls.update();
  }
}

export default Camera;
