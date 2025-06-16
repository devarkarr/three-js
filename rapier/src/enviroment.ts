import App from "./app";
import * as THREE from "three";

class Enviroment {
  app!: App;
  scene!: THREE.Scene;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.setLoaded();
  }

  setLoaded() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.SpotLight(0xffffff, 2, 0, 0.5, 1, 0.01);

    directionalLight.position.set(8, 7, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
  }
}

export default Enviroment;
