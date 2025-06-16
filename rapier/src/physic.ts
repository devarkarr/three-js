import RAPIER from "@dimforge/rapier3d";
import App from "./app";
import * as THREE from "three";
class Physic {
  app!: App;
  scene!: THREE.Scene;
  world!: RAPIER.World;
  rigidBody!: RAPIER.RigidBody;
  groundRigidType!: RAPIER.RigidBody;
  rapierLoaded!: boolean;
  cubeMesh!: THREE.Mesh;
  groundMesh!: THREE.Mesh;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    import("@dimforge/rapier3d").then((RAPIER) => {
      // Use the RAPIER module here.
      let gravity = { x: 0.0, y: -9.81, z: 0.0 };
      this.world = new RAPIER.World(gravity);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: "#049ef4",
        roughness: 0,
        emissive: "#f43434",
        // metalness: 1,
      });
      this.cubeMesh = new THREE.Mesh(geometry, material);
      this.cubeMesh.castShadow = true;
      this.cubeMesh.position.y = 10;
      this.cubeMesh.position.x = 3;
      this.cubeMesh.position.z = 4;
      this.scene.add(this.cubeMesh);

      const groundGeo = new THREE.BoxGeometry(10, 1, 10);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: "turquoise",
      });
      this.groundMesh = new THREE.Mesh(groundGeo, groundMaterial);
      this.groundMesh.receiveShadow = true;
      this.scene.add(this.groundMesh);
      // rapier
      const rigidBodyType = RAPIER.RigidBodyDesc.dynamic();
      this.rigidBody = this.world.createRigidBody(rigidBodyType);
      this.rigidBody.setTranslation(this.cubeMesh.position, true);
      this.rigidBody.setRotation(this.cubeMesh.quaternion, true);

      const colliderType = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
      this.world.createCollider(colliderType, this.rigidBody);

      const groundRigidType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidType = this.world.createRigidBody(groundRigidType);
      const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5);
      this.world.createCollider(groundColliderType, this.groundRigidType);

      this.rapierLoaded = true;
    });
  }

  loop() {
    if (!this.rapierLoaded) return;

    this.world.step();
    const position = this.rigidBody.translation();
    const rotation = this.rigidBody.rotation();
    this.cubeMesh.position.copy(position);
    this.cubeMesh.quaternion.copy(rotation);
  }
}

export default Physic;
