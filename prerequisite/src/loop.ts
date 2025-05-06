import App from "./app";
import Camera from "./camera";
import Render from "./render";

class Loop {
  app!: App;
  camera!: Camera;
  render!: Render;

  constructor() {
    this.app = new App();
    this.camera = this.app.camera;
    this.render = this.app.renderer;
    this.loop();
  }

  loop() {
    this.camera.loop();
    this.render.loop();

    window.requestAnimationFrame(() => this.loop());
  }
}

export default Loop;
