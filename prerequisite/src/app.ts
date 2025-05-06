import * as THREE from "three";
import Camera from "./camera";
import Render from "./render";
import Loop from "./loop";

let instance: App | null = null;

class App {
  canvas!: HTMLElement;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Render;
  loop!: Loop;

  constructor() {
    if (instance) return instance;
    instance = this;
    this.canvas = document.body;
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Render();
    this.loop = new Loop();
  }
}

export default App;
