import { sizeStore } from "./size-store";

class Resize {
  constructor() {
    const { setState } = sizeStore;
    window.addEventListener("resize", () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      });
    });
  }
}

export default Resize;
