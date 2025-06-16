import * as THREE from "three";
import App from "./app";
import Enviroment from "./enviroment";
import Physic from "./physic";

class World {
  app!: App;
  scene!: THREE.Scene;
  cubeMesh!: THREE.Mesh;
  enviroment!: Enviroment;
  physic!: Physic;

  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physic = new Physic();
    this.enviroment = new Enviroment();
  }

  loop() {
    this.physic.loop();
  }
}

export default World;
