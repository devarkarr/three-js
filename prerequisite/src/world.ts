import * as THREE from "three";
import App from "./app";

class World {
  app!: App;
  scene!: THREE.Scene;
  cubeMesh!: THREE.Mesh;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.setCubeMesh();
  }

  setCubeMesh() {
    this.cubeMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    this.scene.add(this.cubeMesh);
  }

  loop() {
    this.cubeMesh.rotation.x += 0.01;
    this.cubeMesh.rotation.y += 0.01;
  }
}

export default World;
