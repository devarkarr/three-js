import * as THREE from "three";
import Camera from "./camera";
import Render from "./render";
import Loop from "./loop";
import World from "./world";

let instance: App | null = null;

class App {
  canvas!: HTMLElement;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Render;
  loop!: Loop;
  world!: World;
  constructor() {
    if (instance) return instance;
    instance = this;
    this.canvas = document.body;
    this.scene = new THREE.Scene();
    this.world = new World();
    this.camera = new Camera();
    this.renderer = new Render();
    this.loop = new Loop();
  }
}

export default App;
