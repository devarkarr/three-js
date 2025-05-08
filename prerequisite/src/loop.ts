import App from "./app";
import Camera from "./camera";
import Render from "./render";
import World from "./world";

class Loop {
  app!: App;
  camera!: Camera;
  render!: Render;
  // world!: World;
  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.render = this.app.renderer;
    // this.world = this.app.world;
    this.loop();
  }

  loop() {
    // this.world.loop();
    this.camera.loop();
    this.render.loop();
    window.requestAnimationFrame(() => this.loop());
  }
}

export default Loop;
