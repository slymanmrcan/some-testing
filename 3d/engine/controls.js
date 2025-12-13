
import { PointerLockControls }
  from "https://unpkg.com/three@0.160.0/examples/jsm/controls/PointerLockControls.js";

export function initControls(camera, dom) {
  const controls = new PointerLockControls(camera, dom);

  document.addEventListener("click", () => {
    controls.lock();
  });

  return controls;
}
