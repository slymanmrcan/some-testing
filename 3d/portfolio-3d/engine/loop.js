export function createLoop(renderer, scene, camera) {
  const updaters = [];
  let running = false;
  let last = performance.now();

  function frame(now) {
    if (!running) return;
    const delta = (now - last) / 1000;
    last = now;

    for (const fn of updaters) fn(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  return {
    addUpdater(fn) {
      updaters.push(fn);
    },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    },
    stop() {
      running = false;
    }
  };
}
