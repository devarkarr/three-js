import * as THREE from "three";
import Camera from "./camera";
import Render from "./render";
import Loop from "./loop";
import World from "./world";
import Resize from "./resize";

let instance: App | null = null;

class App {
  canvas!: HTMLElement;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Render;
  loop!: Loop;
  world!: World;
  resize!: Resize;

  constructor() {
    if (instance) return instance;
    instance = this;
    this.canvas = document.body;
    this.scene = new THREE.Scene();
    this.world = new World();
    this.camera = new Camera();
    this.renderer = new Render();
    this.resize = new Resize();
    this.loop = new Loop();
  }
}

export default App;
